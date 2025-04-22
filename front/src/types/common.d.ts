export interface MetaData {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}

export type Option = { label: string; value: string };

export type PaginatedResponse = {
  data: Option[];
  meta: MetaData;
};
