import { IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ListSchedulesUsecase } from '@/schedule/application/usecases/list-schedule.usecase';
import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';

export class ListSchedulesDto implements ListSchedulesUsecase.Input {
  @ApiPropertyOptional({ description: 'The page number' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'The number of items per page' })
  @IsOptional()
  perPage?: number;

  @ApiPropertyOptional({
    description: 'The field that should be used for sorting',
    enum: ['createdAt'],
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
    description: 'The filter to apply to the search',
  })
  @IsOptional()
  name?: string | null;

  @ApiPropertyOptional({
    description: 'The timeslot(s) to apply to the search',
  })
  @IsOptional()
  timeSlots?: string[] | null;

  @ApiPropertyOptional({
    description: 'The dayPattern(s) to apply to the search',
  })
  @IsOptional()
  dayPatterns?: string[] | null;
}
