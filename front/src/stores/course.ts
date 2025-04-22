import { acceptHMRUpdate, defineStore } from 'pinia';
import type { AutocompleteCourseData, Course } from 'src/types/course';
import type { PaginationMeta } from 'src/types/common';
import { indexCourses } from 'src/api/CourseApi';

export const useCourseStore = defineStore('course', {
  actions: {
    async autocomplete(
      autocomplete: AutocompleteCourseData,
    ): Promise<{ data: Course[]; meta: PaginationMeta }> {
      return indexCourses(autocomplete.autocomplete, autocomplete.page);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCourseStore, import.meta.hot));
}
