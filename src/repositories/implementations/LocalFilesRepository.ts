import { File } from '@entities/File';
import { IFilesRepository } from '@repositories/IFilesRepository';

export class LocalFilesRepository implements IFilesRepository {
  private files: File[] = [];

  async save(files: File[]): Promise<void> {
    this.files = [...this.files, ...files];
  }

  async listAll(): Promise<File[]> {
    return this.files;
  }
}
