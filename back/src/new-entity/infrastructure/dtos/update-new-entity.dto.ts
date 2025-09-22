import { UpdateNewEntityUsecase } from '@/new-entity/application/usecases/update-new-entity.usecase';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNewEntityDto implements Omit<UpdateNewEntityUsecase.Input, 'id'> {
  @ApiProperty({ description: 'The name of the new-entity' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
