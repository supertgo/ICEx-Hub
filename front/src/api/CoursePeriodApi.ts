import { getAxiosWithAuth } from 'boot/axios';
import type { CoursePeriod, PaginationMeta } from 'src/types/coursePeriod';

export const indexCoursePeriods = async (
  autocomplete: string,
  page: number,
  courseId: string,
): Promise<{ data: CoursePeriod[]; meta: PaginationMeta }> => {
  const response = await getAxiosWithAuth().get('/course-period', {
    params: {
      courseId: courseId,
      page: page,
    },
  });

  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};
