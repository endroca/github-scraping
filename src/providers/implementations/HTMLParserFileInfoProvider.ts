import { parse } from 'node-html-parser';
import {
  IFileInfoProvider,
  IFileInfoResponse,
} from '@providers/IFileInfoProvider';

export class HTMLParserFileInfoProvider implements IFileInfoProvider {
  fetch = (html: string): IFileInfoResponse => {
    const dom = parse(html);
    const filter = dom.querySelector('div.text-mono');
    const extract = /(.*)\n\s*(.*)/gi.exec(filter.rawText.trim());

    return {
      length: extract[1],
      size: extract[2],
    };
  };
}
