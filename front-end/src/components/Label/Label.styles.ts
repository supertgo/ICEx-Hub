import styled from 'styled-components';
import { theme } from 'styles/theme';

export const Wrapper = styled.label`
	display: flex;
	flex-direction: column;
	cursor: pointer;
	font-size: ${theme.font.sizes.x};
	font-weight: ${theme.font.weights.bold};
	color: ${theme.colors.darkTitanium};
	padding-bottom: ${theme.space.xxsmall};
`;
