export interface IListFilesResponse {
  name: string;
  href: string;
  type: string;
}

export interface IListFilesProvider {
  fetch: (html: string) => IListFilesResponse[];
}
