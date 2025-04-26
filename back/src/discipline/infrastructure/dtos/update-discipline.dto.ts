import { UpdateDisciplineUsecase } from '@/discipline/application/usecases/update-discipline.usecase';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDisciplineDto implements Omit<UpdateDisciplineUsecase.Input, 'id'> {
  @ApiProperty({ description: 'The name of the discipline' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
