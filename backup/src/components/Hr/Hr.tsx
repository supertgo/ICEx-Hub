import styled, { css } from 'styled-components';

export const Hr = styled.div`
	${({ theme }) => css`
		width: 100%;
		height: ${theme.borderWidth.hairline};
		background: #d6ddeb;
	`}
`;
