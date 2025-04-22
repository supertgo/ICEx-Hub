export interface MetaData {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}

export type Option = { label: string; value: string };

export type PaginationMeta = {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
};

export type PaginatedResponse = {
  data: Option[];
  meta: PaginationMeta;
};
