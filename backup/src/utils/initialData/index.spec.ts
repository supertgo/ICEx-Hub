import { getInitialData } from '.';

type TestInitialData = {
	test: string;
};

describe('getInitialData()', () => {
	it('should return initial data as response', () => {
		const response = getInitialData<TestInitialData>({
			initialData: {
				test: 'pass',
			},
		});

		expect(response.data.test).toBe('pass');
		expect(response).toHaveProperty('statusText');
		expect(response).toHaveProperty('config');
		expect(response).toHaveProperty('status');
		expect(response).toHaveProperty('request');
	});
});
