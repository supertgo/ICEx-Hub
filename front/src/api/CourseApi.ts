import { api } from 'boot/axios';
import type { Course } from 'src/types/course';
import type { PaginationMeta } from 'src/types/common';

export const indexCourses = async (
  autocomplete: string,
  page: number,
): Promise<{ data: Course[]; meta: PaginationMeta }> => {
  const response = await api.get('/course', {
    params: {
      filter: autocomplete,
      page: page,
    },
  });

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};
