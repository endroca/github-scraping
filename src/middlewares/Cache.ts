import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache();

const cached = (duration?: number) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = `express:${req.originalUrl}` || req.url;
  const cachedBody = cache.get(key);
  if (cachedBody) {
    res.json(cachedBody);
    return;
  }

  res.jsonCached = (body) => {
    cache.set(key, body, duration);
    res.json(body);
  };

  next();
};

export { cached };
