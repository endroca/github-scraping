import { AxiosProvider } from '@providers/implementations/AxiosProvider';
import { HTMLParserFileInfoProvider } from '@providers/implementations/HTMLParserFileInfoProvider';
import { HTMLParserFileListProvider } from '@providers/implementations/HTMLParserFileListProvider';
import { LocalFilesRepository } from '@repositories/implementations/LocalFileRepository';
import { InfoAllFilesService } from '@services/implementations/InfoAllFilesService';
import { ListAllFilesService } from 'services/implementations/ListAllFilesService';
import { CreateFilesController } from './CreateFilesController';
import { CreateFilesUseCase } from './CreateFilesUseCase';

const fileInfoParser = new HTMLParserFileInfoProvider();
const fileListParser = new HTMLParserFileListProvider();
const request = new AxiosProvider();

const fileListService = new ListAllFilesService(request, fileListParser);
const fileInfoService = new InfoAllFilesService(request, fileInfoParser);
const filesRepository = new LocalFilesRepository();

const createFilesUseCase = new CreateFilesUseCase(
  fileListService,
  fileInfoService,
  filesRepository
);

const createFilesController = new CreateFilesController(createFilesUseCase);

export { createFilesUseCase, createFilesController };
