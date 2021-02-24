import { IRequestsProvider } from '@providers/IRequestsProvider';
import { IFilesRepository } from '@repositories/IFilesRepository';
import { IFileListProvider } from '@providers/IFileListProvider';
import { IFileInfoProvider } from '@providers/IFileInfoProvider';
import { File } from '@entities/File';
import { ICreateFilesRequestDTO } from './CreateFilesDTO';

export class CreateFilesUseCase {
  constructor(
    private fileListParser: IFileListProvider,
    private fileInfoParser: IFileInfoProvider,
    private request: IRequestsProvider,
    private filesRepository: IFilesRepository
  ) {}

  async execute(data: ICreateFilesRequestDTO) {}
}
