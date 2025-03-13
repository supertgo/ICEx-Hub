import styled, { css } from 'styled-components';

export const DefaultText = styled.h3`
	${({ theme }) => css`
		font-weight: normal;
		display: flex;
		margin: ${theme.space.medium};
	`}
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

export const TableData = styled.p`
	${({ theme }) => css`
		color: ${theme.colors.darkBlue};
		font-size: ${theme.font.sizes.sm};
		font-weight: 500;
		text-wrap: nowrap;
	`}
`;

export const TableDataLink = styled.a`
	${({ theme }) => css`
		color: ${theme.colors.primary};
		font-size: ${theme.font.sizes.sm};
		font-weight: 500;
		text-wrap: nowrap;
	`}
`;

export const UserWrapperColumn = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		max-width: 20rem;
    gap: ${theme.space.xxsmall};

		${UserAvatar}, img {
			object-fit: cover;
			margin-right: ${theme.space.xxxsmall};
		}

		p {
			color: ${theme.colors.darkBlue};
			font-size: ${theme.font.sizes.sm};
			font-weight: 500;
			text-wrap: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	`}
`;

export const UserAvatar = styled.div`
	${({ theme }) => css`
		min-width: 4rem;
		min-height: 4rem;
		border-radius: ${theme.borderRadius.full};
		background-color: ${theme.colors.primary};
	`}
`;

export const Thead = styled.thead`
	& th:last-child {
		width: fit-content;
	}
`;

export const Td = styled.td`
	${({ theme }) => css`
		padding: ${theme.space.small};
		font-size: ${theme.font.sizes.sm};
	`}
`;

export const Tbody = styled.tbody`
	${({ theme }) => css`
		${Td} {
			background: white;
		}

		& td:first-child {
			font-weight: ${theme.font.weights.medium};
			text-align: left;
		}

		& td span:not(:first-child) {
			font-weight: normal;
		}
	`}
`;
