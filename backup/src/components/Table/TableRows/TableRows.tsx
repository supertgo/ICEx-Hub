import { Table, flexRender } from '@tanstack/react-table';
import * as S from 'components/Table/Table.styles';
import { JobApplication } from 'protocols/external/job/job-application';

type TableProposalsRowsProps = {
  table: Table<JobApplication>;
};

export const TableRows = ({ table }: TableProposalsRowsProps) => {
  return (
    <>
      {table.getRowModel().rows.map((row, index) => {
        return (
          <S.Tr key={row.id} $isWhite={(index % 2) !== 0}>
            {row.getVisibleCells().map((cell) => (
              <S.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </S.Td>
            ))}
          </S.Tr>
        );
      })}
    </>
  );
};
