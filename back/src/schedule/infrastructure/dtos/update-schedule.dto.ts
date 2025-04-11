import { UpdateScheduleUsecase } from '@/schedule/application/usecases/update-schedule.usecase';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateScheduleDto
  implements Omit<UpdateScheduleUsecase.Input, 'id'>
{
  @ApiProperty({ description: 'The new classroomId of the schedule' })
  @IsString()
  classroomId?: string;

  @ApiProperty({ description: 'The new disciplineId of the schedule' })
  @IsString()
  disciplineId?: string;
}
