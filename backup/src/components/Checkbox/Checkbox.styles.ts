import styled, { css, DefaultTheme } from 'styled-components';
import { CheckboxProps } from './Checkbox';

export type LabelProps = {
  $size: CheckboxProps['size'];
};

const labelModifiers = {
  small: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xxs};
    ${Checkbox} {
      width: 2rem;
      height: 2rem;
    }
  `,
  medium: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.sm};
    ${Checkbox} {
      width: 2.4rem;
      height: 2.4rem;
    }
  `,
};

export const Label = styled.label<LabelProps>`
  ${({ theme, $size = 'small' }) => css`
    color: #64748b;
    font-size: ${theme.font.sizes.xxs};
    display: flex;
    align-items: self-end;
    text-wrap: nowrap;
    cursor: pointer;

    ${labelModifiers[$size](theme)};
  `}
`;

export const Checkbox = styled.input`
  ${({ theme }) => css`
    border: ${theme.borderWidth.hairline} solid #e2e8f0;
    width: 2rem;
    height: 2rem;
    margin-right: ${theme.space.xsmall};
  `}
`;
