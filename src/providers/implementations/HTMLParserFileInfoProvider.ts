import { parse } from 'node-html-parser';
import {
  IFileInfoProvider,
  IFileInfoResponse,
} from '@providers/IFileInfoProvider';

export class HTMLParserFileInfoProvider implements IFileInfoProvider {
  fetch = (html: string): IFileInfoResponse => {
    const dom = parse(html);
    const filter = dom.querySelector('div.text-mono');
    const extract = /(.*)[\r\n\s]*(.*)/gi.exec(filter.rawText.trim());

    if (extract[2] === '') {
      return {
        length: null,
        size: extract[1],
      };
    }

    return {
      length: extract[1],
      size: extract[2],
    };
  };
}
