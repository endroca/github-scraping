import { IRequestsProvider } from '@providers/IRequestsProvider';
import { IFilesRepository } from '@repositories/IFilesRepository';
import { IListFilesProvider } from '@providers/IListFilesProvider';
import { IFileInfoProvider } from '@providers/IFileInfoProvider';
import { ICreateFilesRequestDTO } from './CreateFilesDTO';

export class CreateFilesUseCase {
  constructor(
    private fileListParser: IListFilesProvider,
    private fileInfoParser: IFileInfoProvider,
    private request: IRequestsProvider,
    private filesRepository: IFilesRepository
  ) {}

  async execute(data: ICreateFilesRequestDTO) {
    let htmlListFile;

    try {
      htmlListFile = await this.request.get(data.url);
    } catch (error) {
      throw new Error(error.code);
    }

    const files = this.fileListParser.fetch(htmlListFile);

    console.log(files);
    console.log(`https://github.com${files[4].href}`);

    const htmlFileInfo = await this.request.get(
      `https://github.com${files[0].href}`
    );
    const info = this.fileInfoParser.fetch(htmlFileInfo);

    // files.forEach((file) => {
    //   if (file.type === 'Directory') {
    //     // this.execute({ url: `https://github.com${file.href}` });
    //   }else if(file.type === 'File') {

    //   }
    // });

    console.log(files);
  }
}
