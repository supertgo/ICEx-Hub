export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface AutocompleteCourseData {
  autocomplete: string;
  page: number;
}
