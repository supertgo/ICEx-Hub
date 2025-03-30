import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCourseUsecase } from '@/course/application/usecases/create-course.usecase';

export class CreateCourseDto implements CreateCourseUsecase.Input {
  @ApiProperty({ description: 'The name of the course' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The code of the course' })
  @IsString()
  @IsNotEmpty()
  code: string;
}
