import { getAxiosWithAuth } from 'boot/axios';
import type { CoursePeriod, PaginationMeta } from 'src/types/coursePeriod';

export const indexCoursePeriods = async (
  autocomplete: string,
  page: number,
): Promise<{ data: CoursePeriod[]; meta: PaginationMeta }> => {
  const response = await getAxiosWithAuth().get('/course-period', {
    params: {
      page: page,
      courseId: autocomplete,
    },
  });

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};
