export interface ICreateFilesRequestDTO {
  user: string;
  repository: string;
}

interface FileResponseDTO {
  name: string;
  href: string;
  length: string;
  size: string;
}

export interface ICreateFileResponseDTO {
  [key: string]: FileResponseDTO[];
}
