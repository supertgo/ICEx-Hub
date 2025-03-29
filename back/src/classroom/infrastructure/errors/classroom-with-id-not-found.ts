export class ClassroomWithIdNotFoundError extends Error {
  constructor(public id: string) {
    super(`Classroom having id ${id} not found`);
    this.name = 'ClassroomWithIdNotFoundError';
  }
}
