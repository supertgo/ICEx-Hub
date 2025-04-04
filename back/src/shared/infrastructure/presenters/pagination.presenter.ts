import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export type PaginationPresenterProps = {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
};

export class PaginationPresenter {
  @ApiProperty({
    type: Number,
    description: 'Current page number',
    example: 1,
  })
  @Transform(({ value }) => parseInt(value))
  currentPage: number;

  @ApiProperty({
    type: Number,
    description: 'Items per page',
    example: 10,
  })
  @Transform(({ value }) => parseInt(value))
  perPage: number;

  @ApiProperty({
    type: Number,
    description: 'Total pages available',
    example: 5,
  })
  @Transform(({ value }) => parseInt(value))
  lastPage: number;

  @ApiProperty({
    type: Number,
    description: 'Total items available',
    example: 50,
  })
  @Transform(({ value }) => parseInt(value))
  total: number;

  constructor(props: PaginationPresenterProps) {
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = props.lastPage;
    this.total = props.total;
  }
}
