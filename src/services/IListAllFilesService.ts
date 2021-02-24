import { IFileListBodyResponse } from '@providers/IFileListProvider';

export interface IListAllFilesService {
  run(url: string, concurrency?: number): Promise<IFileListBodyResponse[]>;
}
