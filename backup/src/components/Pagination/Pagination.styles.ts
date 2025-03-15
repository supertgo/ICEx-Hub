import styled, { css, DefaultTheme } from 'styled-components';

type IconProps = {
  $isChecked?: boolean;
  disabled?: boolean;
  $variant?: 'default' | 'primary';
};

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: ${theme.space.xxsmall};
    justify-content: center;
    align-items: center;
  `}
`;

export const Details = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxs};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
  `}
`;

const iconVariant = {
  default: () => css``,

  primary: (theme: DefaultTheme) => css`
    background: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.white};
      color: ${theme.colors.primary};
      font-weight: bolder;
    }
  `,
};

export const Icon = styled.button<IconProps>`
  ${({ theme, $variant, $isChecked, disabled }) => css`
    border: 0;
    all: inset;
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.font.sizes.xxs};
    border-radius: 0.4rem;
    cursor: pointer;
    background: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      font-weight: bold;
    }

    ${$variant && iconVariant[$variant](theme)}

    ${$isChecked &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      font-weight: bold;
    `}

    ${disabled &&
    css`
      pointer-events: none;
      cursor: not-allowed;
    `}
  `}
`;
