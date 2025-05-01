import { DisciplineEntity } from '@/discipline/domain/entities/discipline.entity';
import { DisciplineOutputMapper } from '@/discipline/application/dtos/discipline-output';
import { DisciplineDataBuilder } from '@/discipline/domain/testing/helper/discipline-data-builder';

describe('Discipline output unit tests', () => {
  it('should convert a discipline in output', () => {
    const discipline = new DisciplineEntity(DisciplineDataBuilder({}));
    const spyOn = jest.spyOn(discipline, 'toJSON');
    const disciplineMapper = DisciplineOutputMapper.toOutput(discipline);

    expect(spyOn).toHaveBeenCalledTimes(1);
    expect(disciplineMapper).toStrictEqual(discipline.toJSON());
  });
});
