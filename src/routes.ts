import { Router } from 'express';
import { createFilesController } from './useCases/CreateFiles';

const routes = Router();

routes.get('/', (req, res) => {
  createFilesController.handle(req, res);
});

export { routes };
