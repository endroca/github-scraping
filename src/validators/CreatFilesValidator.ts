import { query } from 'express-validator';

const CreatFilesValidator = () => [
  query('user').notEmpty(),
  query('repository').notEmpty(),
];

export { CreatFilesValidator };
