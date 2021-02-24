import PQueue from 'p-queue';
import { IFileListBodyResponse } from '@providers/IFileListProvider';
import { HTMLParserFileListProvider } from '@providers/implementations/HTMLParserFileListProvider';
import { IRequestsProvider } from '@providers/IRequestsProvider';

export class ListAllFilesService extends HTMLParserFileListProvider {
  private data: IFileListBodyResponse[];

  private queue = new PQueue();

  constructor(private request: IRequestsProvider) {
    super();
  }

  run = async (url: string): Promise<IFileListBodyResponse[]> => {
    await this.queue.add(() => this.verify(url));
    await this.queue.onIdle();

    return this.data;
  };

  private async verify(url: string) {
    let htmlListFile;

    try {
      htmlListFile = await this.request.get(url);
    } catch (error) {
      throw new Error(error.code);
    }

    const files = this.fetch(htmlListFile);

    if (!files.files.length) {
      throw new Error('Repository not found');
    }

    files.files.forEach((file) => {
      if (file.type === 'Directory') {
        this.queue.add(() => this.verify(`https://github.com${file.href}`));
      }
    });

    this.data.push({
      lastCommit: files.lastCommit,
      files: files.files.filter((f) => f.type === 'File'),
    });
  }
}
