import { v4 } from 'uuid';

export class File {
  public readonly id: string;

  public name: string;

  public extension: string;

  public length: string;

  public size: string;

  constructor(props: Omit<File, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = v4();
    }
  }
}
