import { Router } from 'express';
import { CreatFilesValidator } from '@validators/CreatFilesValidator';
import { validate } from '@middlewares/Validator';
import { cached } from '@middlewares/Cache';
import { createFilesController } from './useCases/CreateFiles';

const routes = Router();

routes.get('/', CreatFilesValidator(), validate, cached(), (req, res) => {
  createFilesController.handle(req, res);
});

export { routes };
