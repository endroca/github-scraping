import { File } from '@entities/File';

export interface IFileRepository {
  save(file: File): Promise<void>;
  listAll(): Promise<File[]>;
}
