import styled, { css } from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  ${({ theme }) => css`
    border: 1px solid #e2e8f0;
    /* border-radius: 1.2rem; */
    height: 5rem;
    padding: ${theme.space.xxsmall} ${theme.space.small};
  `}
`;

export const ErrorMessage = styled.p`
  ${({ theme }) => css`
    color: red;
    margin-top: ${theme.space.xxxsmall};
    font-size: ${theme.font.sizes.xxs};
  `}
`;
