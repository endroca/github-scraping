export interface IFileListResponse {
  name: string;
  extension: string;
  href: string;
  type: 'Directory' | 'File';
}

export interface IFileListBodyResponse {
  lastCommit: string;
  files: IFileListResponse[];
}

export interface IFileListProvider {
  fetch: (html: string) => IFileListBodyResponse;
}
