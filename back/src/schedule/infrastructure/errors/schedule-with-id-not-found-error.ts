export class ScheduleWithIdNotFoundError extends Error {
  constructor(public id: string) {
    super(`schedule having id ${id} not found`);
    this.name = 'scheduleWithIdNotFoundError';
  }
}
