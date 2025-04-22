import { acceptHMRUpdate, defineStore } from 'pinia';
import type { AutocompleteCourseData, Course } from 'src/types/course';
import { indexCourses } from 'src/api/CourseApi';
import { type MetaData } from 'src/types/common';

export const useCourseStore = defineStore('course', {
  actions: {
    async autocomplete(
      autocomplete: AutocompleteCourseData,
    ): Promise<{ data: Course[]; meta: MetaData }> {
      return indexCourses(autocomplete.autocomplete, autocomplete.page);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCourseStore, import.meta.hot));
}
