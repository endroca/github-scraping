import PQueue from 'p-queue';
import {
  IInfoAllFilesBodyResponse,
  IInfoAllFilesService,
} from '@services/IInfoAllFilesService';
import { IRequestsProvider } from '@providers/IRequestsProvider';
import { IFileInfoProvider } from '@providers/IFileInfoProvider';
import { IFileListResponse } from '@providers/IFileListProvider';

export class InfoAllFilesService implements IInfoAllFilesService {
  private data: IInfoAllFilesBodyResponse[] = [];

  private queue = new PQueue({ concurrency: 1 });

  constructor(
    private request: IRequestsProvider,
    private fileInfoParser: IFileInfoProvider
  ) {}

  async run(
    url: IFileListResponse[],
    concurrency?: number
  ): Promise<IInfoAllFilesBodyResponse[]> {
    if (concurrency) {
      this.queue.concurrency = concurrency;
    }

    url.forEach((r) => {
      this.queue.add(() => this.verify(r));
    });
    await this.queue.onIdle();

    return this.data;
  }

  private async verify(file: IFileListResponse) {
    let htmlInfoFile;

    try {
      htmlInfoFile = await this.request.get(`https://github.com${file.href}`);
    } catch (error) {
      throw new Error(error.code);
    }

    const filesParser = this.fileInfoParser.fetch(htmlInfoFile);

    this.data.push({
      ...file,
      length: filesParser.length,
      size: filesParser.size,
    });
  }
}
