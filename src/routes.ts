import { Router } from 'express';
import axios from 'axios';
import { JSDOM } from 'jsdom';

const routes = Router();

routes.get('/', async (req, res) => {
  const data = await axios.get('https://github.com/endroca/express-typeorm');

  const dom = new JSDOM(data.data);
  const { document } = dom.window;

  res.json({
    element: '',
  });
});

export { routes };
