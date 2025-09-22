import { UpdateBuildingUsecase } from '@/building/application/usecases/update-building.usecase';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBuildingDto implements Omit<UpdateBuildingUsecase.Input, 'id'> {
  @ApiProperty({ description: 'The name of the building' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
