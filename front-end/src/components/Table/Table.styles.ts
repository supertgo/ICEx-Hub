import styled, { keyframes, css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background: white;
    border-radius: ${theme.borderRadius.sm};
  `}
`;

export const TitleRow = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.space.medium};
  `}
`;

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: ${theme.font.weights.bold};
    font-size: ${theme.font.sizes.xl};
  `}
`;

export const ButtonsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: center;

    & button:not(:last-child) {
      margin-right: ${theme.space.small};
    }
  `}
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

type TrProps = {
  pointer?: boolean;
  $isWhite?: boolean;
};

export const Tr = styled.tr<TrProps>`
  ${({ theme, pointer, $isWhite }) => css`
    border: ${theme.borderWidth.hairline} solid ${theme.colors.whiteGrey};
    background: ${$isWhite ? theme.colors.white : theme.colors.secondWhite};

    & td:first-child {
      font-weight: ${theme.font.weights.medium};
      text-align: center;
      text-wrap: nowrap;
    }

    & td:last-child {
      padding-right: 0;
    }

    & th:last-child {
      padding-right: 0;
      width: 20rem;
    }

    & td:not(:first-child) {
      color: ${theme.colors.grey900};
    }

    ${pointer &&
    css`
      cursor: pointer;
    `}
  `}
`;

type SortedIconsWrapperProps = {
  $rotate?: boolean;
};

export const SortedIconsWrapper = styled.span<SortedIconsWrapperProps>`
  ${({ theme, $rotate }) => css`
    margin-left: ${theme.space.small};

    ${$rotate &&
    css`
      img {
        transform: rotate(180deg);
      }
    `};
  `}
`;

export const Th = styled.th`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    font-size: ${theme.font.sizes.x};
    font-weight: ${theme.font.weights.medium};
    color: ${theme.colors.grey900};
    line-height: ${theme.font.sizes.sm};
    padding: ${theme.space.xmedium};
    margin-bottom: ${theme.space.xxl};
  `}
`;

export const StatusHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;

    span: {
      margin-right: ${theme.space.xxsmall};
    }
  `}
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Td = styled.td`
  ${({ theme }) => css`
    padding: ${theme.space.xmedium} ${theme.space.xmedium};
    font-size: ${theme.font.sizes.sm};
  `}
`;

export const Tbody = styled.tbody`
  ${Td} {
    background: white;
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const loading = keyframes`
  40% {
    background-position: 100% 0;
  }

  100% {
    background-position: 100% 0;
  }
`;

export const LoadingTd = styled.td`
  ${({ theme }) => css`
    position: relative;
    padding: ${theme.space.xmedium};

    div {
      padding: ${theme.space.small};
      background-color: #e7e7e7;
      height: 2.4rem;
      border-radius: 0.4rem;
    }

    &:after {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      left: 0;
      content: none;
      display: block;
      width: 100%;
      height: 2.4rem;
      background-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 60%,
        rgba(255, 255, 255, 0) 80%
      );
      background-size: 20rem 2.4rem;
      background-position: -10rem 0rem;
      background-repeat: no-repeat;
      animation: ${loading} 1s infinite;
    }
  `}
`;

export const ResponsiveTable = styled.div`
  display: block;
  width: 100%;
  overflow-x: auto;
`;
