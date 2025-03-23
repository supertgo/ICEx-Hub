import { ClassroomRepository } from '@/classroom/domain/repositories/classroom.repository';
import { UseCaseInterface } from '@/shared/application/use-cases/use-case';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { ClassroomOutputMapper } from '@/classroom/application/dtos/classroom-output';

export namespace ListClassroomsUsecase {
  export type Input = SearchInput;

  export type Output = PaginationOutput;

  export class UseCase implements UseCaseInterface<Input, Output> {
    constructor(private repository: ClassroomRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new ClassroomRepository.SearchParams(input);

      const searchResult = await this.repository.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: ClassroomRepository.SearchResult): Output {
      const item = searchResult.items.map((classroom) =>
        ClassroomOutputMapper.toOutput(classroom),
      );

      return PaginationOutputMapper.toOutput(item, searchResult);
    }
  }
}
