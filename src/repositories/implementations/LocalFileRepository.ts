import { File } from '@entities/File';
import { IFileRepository } from '@repositories/IFileRepository';

export class LocalFilesRepository implements IFileRepository {
  private files: File[] = [];

  async save(file: File): Promise<void> {
    this.files.push(file);
  }

  async listAll(): Promise<File[]> {
    return this.files;
  }
}
