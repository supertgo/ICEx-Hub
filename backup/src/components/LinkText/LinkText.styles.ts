import styled, { css } from 'styled-components';

export const LinkText = styled.a`
  ${({ theme }) => css`
    text-decoration: none;
    color: ${theme.colors.primary};
    font-weight: ${theme.font.weights.bold};
    font-size: ${theme.font.sizes.xs};
    text-align: right;
  `}
`;
