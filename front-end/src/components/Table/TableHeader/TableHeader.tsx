import { Column, Table, flexRender } from '@tanstack/react-table';

import * as S from 'components/Table/Table.styles';
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons';
import { theme } from 'styles/theme';

type TableProposalsHeadersProps<T> = {
  table: Table<T>;
};

const renderSortingIcon = <T,>(column: Column<T, unknown>) => {
  if (!column.getCanSort()) return null;

  const isSorted = column.getIsSorted();

  const props = {
    color: theme.colors.officialGrey,
    width: 20,
    height: 20
  }
  if (isSorted === 'asc') {
    return (
      <S.SortedIconsWrapper>
        <CaretUpIcon {...props} />
      </S.SortedIconsWrapper>
    );
  }

  if (isSorted === 'desc') {
    return (
      <S.SortedIconsWrapper $rotate>
        <CaretDownIcon {...props} />
      </S.SortedIconsWrapper>
    );
  }

  return (
    <S.SortedIconsWrapper>
      <CaretSortIcon {...props} />
    </S.SortedIconsWrapper>
  );
};

const TableHeader = <T,>({ table }: TableProposalsHeadersProps<T>) => {
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <S.Tr key={headerGroup.id} $isWhite={true}>
          {headerGroup.headers.map((header) => (
            <S.Th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : (
                <S.Content
                  {...{
                    className: header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : '',
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {renderSortingIcon(header.column)}
                </S.Content>
              )}
            </S.Th>
          ))}
        </S.Tr>
      ))}
    </>
  );
};

export default TableHeader;
