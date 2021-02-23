export interface IFileInfoResponse {
  // Number of lines
  length: string;
  // Numer of bytes
  size: string;
}

export interface IFileInfoProvider {
  fetch: (html: string) => IFileInfoResponse;
}
