import { getAxiosWithAuth } from 'boot/axios';
import type { CoursePeriod } from 'src/types/coursePeriod';

export const indexCoursePeriods = async (
  autocomplete: string,
): Promise<CoursePeriod[]> => {
  const response = await getAxiosWithAuth().get('/course-period', {
    params: {
      filter: autocomplete,
    },
  });

  return response.data.data;
};
