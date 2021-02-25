import { IRequestsProvider } from '@providers/IRequestsProvider';
import { IFileListProvider } from '@providers/IFileListProvider';
import { IFileInfoProvider } from '@providers/IFileInfoProvider';
import { ListAllFilesService } from '@services/implementations/ListAllFilesService';
import { InfoAllFilesService } from '@services/implementations/InfoAllFilesService';
import {
  ICreateFileResponseDTO,
  ICreateFilesRequestDTO,
} from './CreateFilesDTO';

export class CreateFilesUseCase {
  constructor(
    private requestProvider: IRequestsProvider,
    private fileListProvider: IFileListProvider,
    private fileInfoProvider: IFileInfoProvider
  ) {}

  async execute(data: ICreateFilesRequestDTO): Promise<ICreateFileResponseDTO> {
    const fileListService = new ListAllFilesService(
      this.requestProvider,
      this.fileListProvider
    );

    const listOfFiles = await fileListService.run(
      `https://github.com/${data.user}/${data.repository}`,
      data.concurrency
    );

    const urls = listOfFiles.reduce((acc, values) => {
      const assing = [...acc, ...values.files];
      return assing;
    }, []);

    const fileInfoService = new InfoAllFilesService(
      this.requestProvider,
      this.fileInfoProvider
    );

    const listOfInfos = await fileInfoService.run(urls, data.concurrency);

    return listOfInfos.reduce((rv, x) => {
      const assing = rv;
      (assing[x.extension] = assing[x.extension] || []).push({
        name: x.name,
        href: x.href,
        length: x.length,
        size: x.size,
      });
      return assing;
    }, {});
  }
}
