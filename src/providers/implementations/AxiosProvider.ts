import axios from 'axios';
import { IRequestsProvider } from '@providers/IRequestsProvider';

export class AxiosProvider implements IRequestsProvider {
  get = async (url: string): Promise<string> => {
    const request = await axios.get(url);

    return request.data;
  };
}
