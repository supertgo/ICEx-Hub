import { IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ListDisciplinesUsecase } from '@/discipline/application/usecases/list-discipline.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class ListDisciplinesDto implements ListDisciplinesUsecase.Input {
  @ApiPropertyOptional({ description: 'The page number' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'The number of items per page' })
  @IsOptional()
  perPage?: number;

  @ApiPropertyOptional({
    description: 'The field that should be used for sorting',
    enum: ['name', 'code', 'createdAt'],
  })
  @IsOptional()
  sort?: string | null;

  @ApiPropertyOptional({
    description: 'The sort direction',
    enum: SortOrderEnum,
  })
  @IsOptional()
  @IsIn([SortOrderEnum.ASC, SortOrderEnum.DESC])
  sortDir?: SortOrderEnum | null;

  @ApiPropertyOptional({
    description: 'The name to filter disciplines',
  })
  @IsOptional()
  name?: string | null;

  @ApiPropertyOptional({
    description: 'The code to filter disciplines',
  })
  @IsOptional()
  code?: string | null;

  @ApiPropertyOptional({
    description: 'The courseId to filter disciplines',
  })
  @IsOptional()
  courseId?: string | null;

  @ApiPropertyOptional({
    description: 'The coursePeriodId to filter disciplines',
  })
  @IsOptional()
  coursePeriodId?: string | null;
}
