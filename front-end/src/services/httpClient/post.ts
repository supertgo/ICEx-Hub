import api from 'services/api/api';
import { HttpResponse } from './common';

export type HttpPostParams = {
  url: string;
  body?: any;
  headers?: any;
};

export interface HttpPostClient {
  post: (params: HttpPostParams) => Promise<HttpResponse>;
}

export class PostClient implements HttpPostClient {
  async post({ url, body }: HttpPostParams) {
    return await api.post<HttpResponse>(url, body, { withCredentials: true });
  }
}
