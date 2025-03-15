import { Table } from '@tanstack/react-table';
import { TableLoader } from 'components/Table/TableLoader';
import { TableRows } from 'components/Table/TableRows';
import { ResponsiveTable } from 'components/Table/Table.styles';
import TableHeader from 'components/Table/TableHeader';

import * as S from 'components/Table/TableData/TableData.styles';
import { JobApplication } from 'protocols/external/job/job-application';

type TableDataProps = {
	isLoading?: boolean;
	data: Table<JobApplication>;
	defaultMessage: string;
	rowsLoader?: number;
	columnsLoader?: number;
};

export const TableData = ({
	isLoading,
	data,
	defaultMessage,
	columnsLoader = 6,
	rowsLoader = 6,
}: TableDataProps) => {
	if (!(data.getRowModel().rows.length || isLoading)) {
		return (
			<>
				<ResponsiveTable>
					<S.Table>
						<S.Thead>
							<TableHeader table={data} />
						</S.Thead>
						<S.Tbody></S.Tbody>
					</S.Table>
				</ResponsiveTable>
				<S.DefaultText>{defaultMessage}</S.DefaultText>
			</>
		);
	}

	return (
		<ResponsiveTable>
			<S.Table>
				<S.Thead>
					<TableHeader table={data} />
				</S.Thead>
				<S.Tbody>
					{isLoading ? (
						<TableLoader rows={rowsLoader} columns={columnsLoader} />
					) : (
						<TableRows table={data} />
					)}
				</S.Tbody>
			</S.Table>
		</ResponsiveTable>
	);
};
