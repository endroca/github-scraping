import { parse } from 'node-html-parser';
import {
  IFileInfoProvider,
  IFileInfoResponse,
} from '@providers/IFileInfoProvider';

export class HTMLParserFileInfoProvider implements IFileInfoProvider {
  fetch = (html: string): IFileInfoResponse => {
    const dom = parse(html);

    const filter = dom.querySelector('.text-mono');

    console.log(filter);
    console.log(filter.rawText);

    return {
      length: filter.rawText,
      size: filter.rawText,
    };
  };
}
