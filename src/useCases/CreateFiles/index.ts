import { AxiosProvider } from '@providers/implementations/AxiosProvider';
import { HTMLParserFileInfoProvider } from '@providers/implementations/HTMLParserFileInfoProvider';
// import { HTMLParserFileListProvider } from '@providers/implementations/HTMLParserFileListProvider';
import { LocalFilesRepository } from '@repositories/implementations/LocalFileRepository';
import { ListAllFilesService } from 'services/ListAllFilesService';
import { CreateFilesController } from './CreateFilesController';
import { CreateFilesUseCase } from './CreateFilesUseCase';

const fileInfoParser = new HTMLParserFileInfoProvider();
const request = new AxiosProvider();
const fileListParser = new ListAllFilesService(request);
const filesRepository = new LocalFilesRepository();

const createFilesUseCase = new CreateFilesUseCase(
  fileListParser,
  fileInfoParser,
  request,
  filesRepository
);

const createFilesController = new CreateFilesController(createFilesUseCase);

export { createFilesUseCase, createFilesController };
