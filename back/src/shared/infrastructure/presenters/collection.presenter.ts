import {
  PaginationPresenter,
  PaginationPresenterProps,
} from '@/shared/infrastructure/presenters/pagination.presenter';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export abstract class CollectionPresenter {
  @Exclude()
  protected paginationPresenter: PaginationPresenter;

  constructor(props: PaginationPresenterProps) {
    this.paginationPresenter = new PaginationPresenter(props);
  }

  @Expose({ name: 'meta' })
  @ApiProperty({
    type: PaginationPresenter,
    description: 'Pagination metadata',
  })
  get meta() {
    return this.paginationPresenter;
  }

  abstract get data(): unknown[];
}
