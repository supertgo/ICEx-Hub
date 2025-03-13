const returnUrlWithQueries = (defaultUrl: string, params: URLSearchParams) => {
	const queryString = params.toString();

	return `${defaultUrl}${queryString ? '?' + queryString : ''}`;
};

const appendItems = (
	items: string[] | undefined,
	params: URLSearchParams,
	key: string,
) => {
	if (items?.length) {
		items.forEach((item) => params.append(key, item));
	}
};
