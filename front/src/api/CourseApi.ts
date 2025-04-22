import { api } from 'boot/axios';
import { type MetaData } from 'src/types/common';
import type { Course } from 'src/types/course';

export const indexCourses = async (
  autocomplete: string,
  page: number,
): Promise<{ data: Course[]; meta: MetaData }> => {
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
