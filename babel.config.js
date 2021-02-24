module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@providers': './src/providers',
          '@repositories': './src/repositories',
          '@entities': './src/entities',
          '@services': './src/services',
          '@validators': './src/validators',
          '@middlewares': './src/middlewares',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
