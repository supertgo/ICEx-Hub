import { ListCoursesUsecase } from '@/course/application/usecases/list-course.usecase';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ListEntityDto } from '@/shared/application/dtos/list-entity.dto';

export class ListCoursesDto
  extends ListEntityDto
  implements ListCoursesUsecase.Input
{
  @ApiPropertyOptional({
    description:
      'The field that should be used for sorting, name is the default',
    enum: ['name', 'createdAt'],
  })
  @IsOptional()
  sort?: string | null;

  @ApiPropertyOptional({
    description: 'The filter to apply to the search using name',
    enum: ['name'],
  })
  @IsOptional()
  name?: string | null;

  @ApiPropertyOptional({
    description: 'The filter to apply to the search using courseId',
    enum: ['courseId'],
  })
  @IsOptional()
  courseId?: string | null;
}
