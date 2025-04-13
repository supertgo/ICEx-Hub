import { acceptHMRUpdate, defineStore } from 'pinia';
import type { AutocompleteCourseData, Course } from 'src/types/course';
import { indexCourses } from 'src/api/CourseApi';

export const useCourseStore = defineStore('course', {
  actions: {
    async autocomplete(
      autocomplete: AutocompleteCourseData,
    ): Promise<Course[]> {
      return indexCourses(autocomplete.autocomplete);
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCourseStore, import.meta.hot));
}
