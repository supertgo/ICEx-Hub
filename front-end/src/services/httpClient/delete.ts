import api from 'services/api/api';
import { HttpResponse } from './common';

export type HttpDeleteParams = {
	url: string;
	body?: any;
	headers?: any;
	id?: any;
};

export interface HttpDeleteClient {
	delete: (params: HttpDeleteParams) => Promise<HttpResponse>;
}
export class DeleteClient implements HttpDeleteClient {
	constructor() {}
	async delete({ url, body }: HttpDeleteParams) {
		return await api.delete(url, { withCredentials: true, data: body });
	}
}
