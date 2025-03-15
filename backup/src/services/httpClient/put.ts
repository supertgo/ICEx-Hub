import api from 'services/api/api';
import { HttpResponse } from './common';

export type HttpPutParams = {
  url: string;
  body?: any;
  headers?: any;
};

export interface HttpPutClient {
  put: (params: HttpPutParams) => Promise<HttpResponse>;
}

export class PutClient implements HttpPutClient {
  async put({ url, body }: HttpPutParams) {
    return await api.put<HttpResponse>(url, body, { withCredentials: true });
  }
}
