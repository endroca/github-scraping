import fs from 'fs';
import path from 'path';
import { HTMLParserFileListProvider } from '../src/providers/implementations/HTMLParserFileListProvider';
import { HTMLParserFileInfoProvider } from '../src/providers/implementations/HTMLParserFileInfoProvider';

describe('Parsers test', () => {
  it('should parser file list', () => {
    const data = {
      lastCommit: null,
      files: [
        {
          name: 'src',
          extension: 'src',
          href: '/endroca/express-typeorm/tree/main/src',
          type: 'Directory',
        },
        {
          name: 'test',
          extension: 'test',
          href: '/endroca/express-typeorm/tree/main/test',
          type: 'Directory',
        },
        {
          name: '.env.example',
          extension: 'example',
          href: '/endroca/express-typeorm/blob/main/.env.example',
          type: 'File',
        },
        {
          name: '.eslintrc.json',
          extension: 'json',
          href: '/endroca/express-typeorm/blob/main/.eslintrc.json',
          type: 'File',
        },
        {
          name: '.gitignore',
          extension: 'gitignore',
          href: '/endroca/express-typeorm/blob/main/.gitignore',
          type: 'File',
        },
        {
          name: 'jest.config.js',
          extension: 'js',
          href: '/endroca/express-typeorm/blob/main/jest.config.js',
          type: 'File',
        },
        {
          name: 'package.json',
          extension: 'json',
          href: '/endroca/express-typeorm/blob/main/package.json',
          type: 'File',
        },
        {
          name: 'tsconfig.json',
          extension: 'json',
          href: '/endroca/express-typeorm/blob/main/tsconfig.json',
          type: 'File',
        },
      ],
    };

    const parser = new HTMLParserFileListProvider();

    const html = fs
      .readFileSync(path.resolve(__dirname, 'pages', 'indexPage.html'))
      .toString();

    const response = parser.fetch(html);

    expect(response).toStrictEqual(data);
  });

  it('should parser file information', () => {
    const data = {
      length: '17 lines (17 sloc)',
      size: '353 Bytes',
    };

    const parser = new HTMLParserFileInfoProvider();

    const html = fs
      .readFileSync(path.resolve(__dirname, 'pages', 'fileTextPage.html'))
      .toString();

    const response = parser.fetch(html);

    expect(response).toStrictEqual(data);
  });

  it('should parser file binary information', () => {
    const data = {
      length: null,
      size: '32 KB',
    };

    const parser = new HTMLParserFileInfoProvider();

    const html = fs
      .readFileSync(path.resolve(__dirname, 'pages', 'fileBinaryPage.html'))
      .toString();

    const response = parser.fetch(html);

    expect(response).toStrictEqual(data);
  });
});
