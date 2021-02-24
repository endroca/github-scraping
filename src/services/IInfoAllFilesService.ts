import { IFileInfoResponse } from '@providers/IFileInfoProvider';
import { IFileListResponse } from '@providers/IFileListProvider';

export interface IInfoAllFilesBodyResponse
  extends IFileListResponse,
    IFileInfoResponse {}

export interface IInfoAllFilesService {
  run(
    url: IFileListResponse[],
    concurrency?: number
  ): Promise<IInfoAllFilesBodyResponse[]>;
}
