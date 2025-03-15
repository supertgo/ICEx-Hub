import styled, { css } from 'styled-components';

export const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    h3 {
      margin-bottom: ${theme.space.xlarge};
    }

    & > div {
      margin-bottom: ${theme.space.small};
    }

    a {
      margin-bottom: ${theme.space.large};
    }
  `}
`;

export const DialogWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Text = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.grey900};
    font-weight: ${theme.font.weights.regular};
    font-size: ${theme.font.sizes.xs};
    margin-top: ${theme.space.xxxlarge};
    text-align: center;
  `}
`;
