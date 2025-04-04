import { SortOrderEnum } from '@/shared/domain/repositories/searchable-repository-contracts';
import { IsIn, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListEntityDto {
  @ApiPropertyOptional({
    description: 'The page number',
    default: 1,
    example: 1,
  })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'The number of items per page',
    default: 10,
    example: 10,
  })
  @IsOptional()
  perPage?: number;

  @ApiPropertyOptional({
    description: 'The sort direction',
    enum: SortOrderEnum,
    example: SortOrderEnum.ASC,
    default: SortOrderEnum.ASC,
  })
  @IsOptional()
  @IsIn([SortOrderEnum.ASC, SortOrderEnum.DESC])
  sortDir?: SortOrderEnum | null;
}
