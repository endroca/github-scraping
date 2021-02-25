import { Request, Response } from 'express';
import { CreateFilesUseCase } from './CreateFilesUseCase';

export class CreateFilesController {
  constructor(private createFilesUseCase: CreateFilesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user, repository, concurrency } = request.query;

    try {
      const data = await this.createFilesUseCase.execute({
        user: String(user),
        repository: String(repository),
        concurrency: Number(concurrency),
      });

      return response.jsonCached(data);
    } catch (error) {
      return response
        .status(400)
        .json({ error: error.message || 'Unexpected error' });
    }
  }
}
