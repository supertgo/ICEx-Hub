import { getAxiosWithAuth } from 'boot/axios';
import type { Course } from 'src/types/course';

export const indexCourses = async (autocomplete: string): Promise<Course[]> => {
  const response = await getAxiosWithAuth().get('/course', {
    params: {
      filter: autocomplete,
    },
  });

  return response.data.data;
};
