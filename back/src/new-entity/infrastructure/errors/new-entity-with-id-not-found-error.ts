export class NewEntityWithIdNotFoundError extends Error {
  constructor(public id: string) {
    super(`new-entity having id ${id} not found`);
    this.name = 'new-entityWithIdNotFoundError';
  }
}
