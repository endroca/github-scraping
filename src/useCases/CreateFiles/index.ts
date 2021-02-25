import { AxiosProvider } from '@providers/implementations/AxiosProvider';
import { HTMLParserFileInfoProvider } from '@providers/implementations/HTMLParserFileInfoProvider';
import { HTMLParserFileListProvider } from '@providers/implementations/HTMLParserFileListProvider';
import { CreateFilesController } from './CreateFilesController';
import { CreateFilesUseCase } from './CreateFilesUseCase';

const fileInfoParser = new HTMLParserFileInfoProvider();
const fileListParser = new HTMLParserFileListProvider();
const request = new AxiosProvider();

const createFilesUseCase = new CreateFilesUseCase(
  request,
  fileListParser,
  fileInfoParser
);

const createFilesController = new CreateFilesController(createFilesUseCase);

export { createFilesUseCase, createFilesController };
