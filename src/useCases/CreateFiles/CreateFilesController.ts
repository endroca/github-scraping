import { Request, Response } from 'express';
import { CreateFilesUseCase } from './CreateFilesUseCase';

export class CreateFilesController {
  constructor(private createFilesUseCase: CreateFilesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { url } = request.query;

    try {
      const data = await this.createFilesUseCase.execute({ url: String(url) });
      return response.json(data);
    } catch (error) {
      console.error(error);
      return response
        .status(400)
        .json({ error: error.message || 'Unexpected error' });
    }
  }
}
