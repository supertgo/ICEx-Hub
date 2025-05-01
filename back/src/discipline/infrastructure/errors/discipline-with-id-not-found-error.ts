export class DisciplineWithIdNotFoundError extends Error {
  constructor(public id: string) {
    super(`discipline having id ${id} not found`);
    this.name = 'disciplineWithIdNotFoundError';
  }
}
