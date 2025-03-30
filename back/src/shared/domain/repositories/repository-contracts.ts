import { Entity } from '@/shared/domain/entities/entity';

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<E>;

  findById(id: string): Promise<E>;

  findAll(): Promise<E[]>;

  update(entity: E): Promise<void>;

  delete(id: string): Promise<void>;
}
