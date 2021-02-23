import { parse } from 'node-html-parser';
import {
  IListFilesProvider,
  IListFilesResponse,
} from '@providers/IListFilesProvider';

export class HTMLParserListFilesProvider implements IListFilesProvider {
  fetch = (html: string): IListFilesResponse[] => {
    const dom = parse(html);

    const filter = dom.querySelectorAll(
      '.js-active-navigation-container > .Box-row'
    );

    return filter.map((element) => {
      const a = element.querySelector('div[role="rowheader"] a');
      const svg = element.querySelector('div[role="gridcell"] svg');

      return {
        name: a.rawText,
        href: a.attributes.href,
        type: svg.attributes['aria-label'],
      };
    });
  };
}
