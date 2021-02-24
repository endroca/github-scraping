import PQueue from 'p-queue';
import {
  IFileListBodyResponse,
  IFileListProvider,
} from '@providers/IFileListProvider';
import { IRequestsProvider } from '@providers/IRequestsProvider';
import { IListAllFilesService } from '@services/IListAllFilesService';

export class ListAllFilesService implements IListAllFilesService {
  private data: IFileListBodyResponse[] = [];

  private queue = new PQueue({ concurrency: 1 });

  constructor(
    private request: IRequestsProvider,
    private fileListParser: IFileListProvider
  ) {}

  async run(url: string): Promise<IFileListBodyResponse[]> {
    await this.queue.add(() => this.verify(url));
    await this.queue.onIdle();

    return this.data;
  }

  private async verify(url: string) {
    let htmlListFile;

    try {
      htmlListFile = await this.request.get(url);
    } catch (error) {
      throw new Error(error.code);
    }

    const filesParser = this.fileListParser.fetch(htmlListFile);

    if (!filesParser.files.length) {
      throw new Error('Repository not found');
    }

    filesParser.files.forEach((file) => {
      if (file.type === 'Directory') {
        this.queue.add(() => this.verify(`https://github.com${file.href}`));
      }
    });

    this.data.push({
      lastCommit: filesParser.lastCommit,
      files: filesParser.files.filter((f) => f.type === 'File'),
    });
  }
}
