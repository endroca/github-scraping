import { Request, Response } from 'express';
import { CreateFilesUseCase } from './CreateFilesUseCase';

export class CreateFilesController {
  constructor(private createFilesUseCase: CreateFilesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { url } = request.query;

    try {
      await this.createFilesUseCase.execute({ url: String(url) });
      return response.status(200).send();
    } catch (error) {
      return response
        .status(400)
        .json({ error: error.message || 'Unexpected error' });
    }
  }
}
