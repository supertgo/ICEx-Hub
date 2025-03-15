import { Children } from 'react';
import * as S from 'components/Table/Table.styles';

export type TableLoaderProps = {
  rows: number;
  columns: number;
};

export const TableLoader = ({ rows, columns }: TableLoaderProps) => {
  return (
    <>
      {Children.toArray(
        [...Array(rows)].map(() => (
          <S.Tr>
            {Children.toArray(
              [...Array(columns)].map(() => (
                <S.LoadingTd data-testid="loading-td">
                  <div />
                </S.LoadingTd>
              )),
            )}
          </S.Tr>
        )),
      )}
    </>
  );
};
