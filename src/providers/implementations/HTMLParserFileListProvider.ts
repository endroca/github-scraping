import { parse } from 'node-html-parser';
import {
  IFileListBodyResponse,
  IFileListProvider,
} from '@providers/IFileListProvider';

export class HTMLParserFileListProvider implements IFileListProvider {
  fetch = (html: string): IFileListBodyResponse => {
    const dom = parse(html);

    // Bug (future implementation)
    // const filterCommits = dom.querySelector('a.text-mono');
    // const lastCommit = filterCommits.rawText;

    const filterFiles = dom.querySelectorAll(
      '.Box-row.Box-row--focus-gray.py-2.d-flex.position-relative.js-navigation-item'
    );

    const files = filterFiles.map((element) => {
      const a = element.querySelector('div[role="rowheader"] a');
      const svg = element.querySelector('div[role="gridcell"] svg');

      return {
        name: a.rawText,
        extension: a.rawText.split('.').pop(),
        href: a.attributes.href,
        type: svg.attributes['aria-label'] as 'Directory' | 'File',
      };
    });

    return { lastCommit: null, files };
  };
}
