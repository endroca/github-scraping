import { IListAllFilesService } from '@services/IListAllFilesService';
import { IInfoAllFilesService } from '@services/IInfoAllFilesService';
import {
  ICreateFileResponseDTO,
  ICreateFilesRequestDTO,
} from './CreateFilesDTO';

export class CreateFilesUseCase {
  constructor(
    private fileListService: IListAllFilesService,
    private fileInfoService: IInfoAllFilesService
  ) {}

  async execute(data: ICreateFilesRequestDTO): Promise<ICreateFileResponseDTO> {
    const listOfFiles = await this.fileListService.run(
      `https://github.com/${data.user}/${data.repository}`,
      data.concurrency
    );

    const urls = listOfFiles.reduce((acc, values) => {
      const assing = [...acc, ...values.files];
      return assing;
    }, []);

    const listOfInfos = await this.fileInfoService.run(urls, data.concurrency);

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
