import { getAxiosWithAuth } from 'boot/axios';
import type { Course, PaginationMeta } from 'src/types/course';

export const indexCourses = async (
  autocomplete: string,
  page: number,
): Promise<{ data: Course[]; meta: PaginationMeta }> => {
  const response = await getAxiosWithAuth().get('/course', {
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
