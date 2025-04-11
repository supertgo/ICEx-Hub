export class CoursePeriodWithIdNotFoundError extends Error {
  constructor(public id: string) {
    super(`Course period having id ${id} not found`);
    this.name = 'CoursePeriodWithIdNotFoundError';
  }
}
