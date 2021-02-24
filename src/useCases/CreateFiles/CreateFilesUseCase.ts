import { IFilesRepository } from '@repositories/IFilesRepository';
import { IFileInfoProvider } from '@providers/IFileInfoProvider';
import { File } from '@entities/File';
import { IListAllFilesService } from '@services/IListAllFilesService';
import { IInfoAllFilesService } from '@services/IInfoAllFilesService';
import { ICreateFilesRequestDTO } from './CreateFilesDTO';

export class CreateFilesUseCase {
  constructor(
    private fileListService: IListAllFilesService,
    private fileInfoService: IInfoAllFilesService,
    private filesRepository: IFilesRepository
  ) {}

  async execute(data: ICreateFilesRequestDTO) {
    const listOfFiles = await this.fileListService.run(data.url);

    const urls = listOfFiles.reduce((acc, values) => {
      const assing = [...acc, ...values.files];
      return assing;
    }, []);

    const listOfInfos = await this.fileInfoService.run(urls);

    return listOfInfos.reduce((rv, x) => {
      const assing = rv;
      (assing[x.extension] = assing[x.extension] || []).push(x);
      return assing;
    }, {});
  }
}
