import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type GetInitialDataProps<T> = {
	initialData: T;
};

export const getInitialData = <T>({ initialData }: GetInitialDataProps<T>) => {
	const response: AxiosResponse<T> = {
    data: initialData,
		config: {} as InternalAxiosRequestConfig,
		statusText: 'ok',
		headers: {},
		status: 200,
		request: {},
	};

	return response;
};
