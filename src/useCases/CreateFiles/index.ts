import { AxiosProvider } from '@providers/implementations/AxiosProvider';
import { HTMLParserFileInfoProvider } from '@providers/implementations/HTMLParserFileInfoProvider';
import { HTMLParserListFilesProvider } from '@providers/implementations/HTMLParserListFilesProvider';
import { LocalFilesRepository } from '@repositories/implementations/LocalFilesRepository';
import { CreateFilesController } from './CreateFilesController';
import { CreateFilesUseCase } from './CreateFilesUseCase';

const fileListParser = new HTMLParserListFilesProvider();
const fileInfoParser = new HTMLParserFileInfoProvider();
const request = new AxiosProvider();
const filesRepository = new LocalFilesRepository();

const createFilesUseCase = new CreateFilesUseCase(
  fileListParser,
  fileInfoParser,
  request,
  filesRepository
);

const createFilesController = new CreateFilesController(createFilesUseCase);

export { createFilesUseCase, createFilesController };
