export interface CoursePeriod {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AutocompleteCoursePeriodData {
  autocomplete: string;
  page: number;
  courseId: string;
}
