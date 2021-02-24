import { Request, Response } from 'express';
import { CreateFilesUseCase } from './CreateFilesUseCase';

export class CreateFilesController {
  constructor(private createFilesUseCase: CreateFilesUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user, repository } = request.query;

    try {
      const data = await this.createFilesUseCase.execute({
        user: String(user),
        repository: String(repository),
      });

      return response.jsonCached(data);
    } catch (error) {
      return response
        .status(400)
        .json({ error: error.message || 'Unexpected error' });
    }
  }
}
