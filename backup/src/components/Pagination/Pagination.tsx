import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import { Children } from 'react';

import * as S from './Pagination.styles';

export interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  goPreviousPage: () => void;
  goNextPage: () => void;
  onPageChange: (page: number) => void;
  hasDetails?: boolean;
}

export const Pagination = ({
  hasNextPage,
  hasPrevPage,
  page,
  totalItems,
  limit,
  goPreviousPage,
  goNextPage,
  onPageChange,
  hasDetails,
}: PaginationProps) => {
  const siblingsCount = 1;

  function generatePagesArray(from: number, to: number) {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1;
      })
      .filter((page) => page > 0);
  }

  const firstRegisterNumberInCurrentPage =
    page === 1 ? 1 : (page - 1) * limit + 1;

  const lastRegisterNumberInCurrentPage =
    page * limit > totalItems ? totalItems : page * limit;

  const lastPage = Math.ceil(totalItems / limit);

  const previousPage =
    page > 1 ? generatePagesArray(page - 1 - siblingsCount, page - 1) : [];

  const nextPages =
    page < lastPage
      ? generatePagesArray(page, Math.min(page + siblingsCount, lastPage))
      : [];

  return (
    <S.Wrapper>
      {hasDetails && (
        <S.Details data-testid="pagination-details">
          <strong>{firstRegisterNumberInCurrentPage}</strong>-
          <strong>{lastRegisterNumberInCurrentPage}</strong>de
          <strong>{totalItems}</strong>
        </S.Details>
      )}
      <S.Container>
        <S.Icon
          key="prev"
          data-testid="prev-button"
          onClick={goPreviousPage}
          disabled={!hasPrevPage}
          $variant="primary"
        >
          <ChevronLeftIcon />
        </S.Icon>
        {page > 1 + siblingsCount && (
          <>
            <S.Icon onClick={() => onPageChange(0)}>1</S.Icon>
            {page > 2 + siblingsCount && <DotsHorizontalIcon />}
          </>
        )}
        {previousPage.length > 0 &&
          Children.toArray(
            previousPage.map((page) => {
              return (
                <S.Icon onClick={() => onPageChange(page - 1)}>{page}</S.Icon>
              );
            }),
          )}
        <S.Icon $isChecked>{page}</S.Icon>
        {nextPages.length > 0 &&
          Children.toArray(
            nextPages.map((page) => {
              return (
                <S.Icon onClick={() => onPageChange(page - 1)}>{page}</S.Icon>
              );
            }),
          )}
        {page + siblingsCount < lastPage && (
          <>
            {page + 1 + siblingsCount < lastPage && <DotsHorizontalIcon />}
            <S.Icon onClick={() => onPageChange(lastPage - 1)}>
              {lastPage}
            </S.Icon>
          </>
        )}
        <S.Icon
          key="next"
          data-testid="next-button"
          onClick={goNextPage}
          disabled={!hasNextPage}
          $variant="primary"
        >
          <ChevronRightIcon />
        </S.Icon>
      </S.Container>
    </S.Wrapper>
  );
};
