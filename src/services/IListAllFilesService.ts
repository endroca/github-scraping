import { IFileListBodyResponse } from '@providers/IFileListProvider';

export interface IListAllFilesService {
  run(url: string): Promise<IFileListBodyResponse[]>;
}
