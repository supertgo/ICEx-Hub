export class CourseWithIdNotFoundError extends Error {
  constructor(public id: string) {
    super(`Course having id ${id} not found`);
    this.name = 'CourseWithIdNotFoundError';
  }
}
