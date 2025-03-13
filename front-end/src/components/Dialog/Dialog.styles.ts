import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled, { css } from 'styled-components';

import { DialogFooterProps } from './Dialog';

type DialogFooterStyledProps = {
	$align: DialogFooterProps['align'];
};


export const DialogOverlay = styled(DialogPrimitive.DialogOverlay)`
	${({ theme }) => css`
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: ${theme.layers.modal};

		&::before {
			content: '';
			background-color: rgba(27, 27, 27, 0.5);
			backdrop-filter: blur(0.4rem);
			position: absolute;
			width: 100%;
			height: 100%;
		}
	`}
`;

export const DialogContent = styled.div`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;

		& > * {
      display: flex;
      flex-direction: column;
			background-color: ${theme.colors.white};
			border-radius: ${theme.space.xsmall};
			width: fit-content;
			max-height: calc(100vh - 3rem);
			z-index: ${theme.layers.modal + 1};
			width: 80rem;
      overflow: hidden;
		}
	`}
`;

export const DialogDescription = styled.div`
	${({ theme }) => css`
		padding: ${theme.space.small};
    overflow-y: auto;
    flex-grow: 1;
	`}
`;

export const DialogHeader = styled.header`
	${({ theme }) => css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: ${theme.space.small};
		color: ${theme.colors.darkGrey};
		border-bottom: 1px solid ${theme.colors.lightGrey};
		font-size: ${theme.font.sizes.xxs};
	`}
`;

export const DialogHeaderCross = styled.span`
	${({ theme }) => css`
		display: flex;
		align-items: center;
		cursor: pointer;
		margin-left: auto;
		color: ${theme.colors.darkGrey};
		stroke: ${theme.colors.darkGrey};
	`}
`;

const dialogFooterAlign = {
	left: () => css``,

	right: () => css`
		justify-content: end;
	`,
};

export const DialogFooter = styled.footer<DialogFooterStyledProps>`
	${({ theme, $align }) => css`
		display: flex;
		gap: ${theme.space.small};
		padding: ${theme.space.small};
		border-top: 1px solid ${theme.colors.lightGrey};

		button {
			border-radius: ${theme.borderRadius.md};
		}

		${$align && dialogFooterAlign[$align]()}
	`}
`;
