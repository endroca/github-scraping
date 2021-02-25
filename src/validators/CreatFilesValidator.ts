import { query } from 'express-validator';

const CreatFilesValidator = () => [
  query('user').notEmpty(),
  query('repository').notEmpty(),
  query('concurrency').optional().isInt({ min: 1 }),
];

export { CreatFilesValidator };
