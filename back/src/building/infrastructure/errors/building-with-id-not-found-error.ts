export class BuildingWithIdNotFoundError extends Error {
  constructor(public id: string) {
    super(`building having id ${id} not found`);
    this.name = 'buildingWithIdNotFoundError';
  }
}
