import { UserProps } from 'protocols/external/user/user';

export const recruiterUserMock: UserProps = {
  id: 1,
  name: 'test',
  phone: '23131313',
  email: 'thiago.teste@gmail.com',
  password: 'password',
  type: 'recruiter',
  about_me: 'about_me',
};

export const completeUserMock: UserProps = {
  id: 1,
  name: 'Hiram Boyer',
  type: 'recruiter',
  phone: '+17754426306',
  email: 'kaleigh46@example.org',
  about_me:
    'Suscipit eius ea vitae rerum eligendi quis. Aliquam nobis at dolorem sit qui nam voluptatem. Qui quidem voluptas et ex possimus velit commodi autem.',
  profile_picture_path:
    'http://localhost/storage/hiM4QZ04YgfF4s2ZohYMrgNeLrCao7eXG4fNIxGgKq00IbpUDi',
  competences: [
    {
      id: 1,
      name: 'Kuhic, Prohaska and Terry',
      description: 'Modi asperiores soluta quod est accusantium aut autem.',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
      type: 'other',
    },
    {
      id: 2,
      name: 'Hyatt, Keeling and Senger',
      description: 'Quos culpa id cupiditate autem quia.',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
      type: 'other',
    },
    {
      id: 3,
      name: 'Lehner LLC',
      description: 'Soluta in aut voluptate voluptas.',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
      type: 'other',
    },
    {
      id: 4,
      name: 'Kuhic-Haag',
      description: 'Ut et iure dolores.',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
      type: 'other',
    },
    {
      id: 7,
      name: "O'Kon-Klein",
      description: 'Est asperiores quam voluptas aspernatur.',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
      type: 'other',
    },
    {
      id: 9,
      name: 'Lockman-Rosenbaum',
      description:
        'Repellendus quibusdam dolorem labore atque expedita est quia.',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
      type: 'other',
    },
  ],
  academic_records: [
    {
      id: 12,
      user_id: 1,
      institution: 'Effertz LLC',
      degree: 'Harum nobis ab delectus beatae facilis.',
      field_of_study: 'Quia qui ut officia corrupti.',
      start_date: '1982-11-09',
      end_date: '2000-08-08',
      is_in_progress: 0,
      description: 'Aliquam quia aut et optio aut ea necessitatibus.',
      created_at: '2024-05-05T10:08:47.000000Z',
      updated_at: '2024-05-05T10:08:47.000000Z',
    },
  ],
  professional_experiences: [
    {
      id: 3,
      user_id: 1,
      company_name: 'Schimmel Group',
      position:
        'Dolore quas facere quo laboriosam. Amet autem deleniti beatae non dolorem dolores et. Temporibus dolor dolorem veniam nisi omnis vitae est. Laboriosam perferendis et maiores.',
      description:
        'Ad praesentium rem accusantium culpa. Ipsum nihil excepturi nisi. Sit similique inventore ratione iusto.',
      start_date: '2019-06-17',
      end_date: '2028-04-22',
      is_current: 0,
      location: '708 Ellsworth Overpass Apt. 233\nSouth Kirsten, ND 04482',
      work_model: 'hybrid',
      employment_type: 'part-time',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
    },
    {
      id: 5,
      user_id: 1,
      company_name: 'Gibson, Mraz and Weissnat',
      position:
        'Voluptates rerum fuga non. Omnis labore et voluptatibus sunt optio enim deserunt. Ut veritatis nam sed. Totam consequuntur tempora vitae.',
      description:
        'Iste odio quod qui nihil enim. Est debitis est et. Dignissimos optio eum dolores.',
      start_date: '2021-04-10',
      end_date: '2025-12-06',
      is_current: 0,
      location: '698 Denesik Mill\nPort Luisaside, CA 77108-7819',
      work_model: 'onSite',
      employment_type: 'full-time',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
    },
    {
      id: 8,
      user_id: 1,
      company_name: 'Macejkovic, Jakubowski and Krajcik',
      position:
        'Laborum provident vero est dolore ducimus qui. Consequatur odit autem cumque qui sed. Dolor dicta eum magnam ad quas dolores. Et quisquam laboriosam qui nobis et.',
      description:
        'Explicabo autem est incidunt itaque et. Iste autem unde vel omnis ut natus et. Qui facere sed repellendus modi amet quidem impedit. Ut dolorem magnam molestias nisi.',
      start_date: '2017-04-05',
      end_date: '2026-02-24',
      is_current: 0,
      location: '11862 Jefferey Circle Apt. 973\nMcLaughlinview, VA 53558-0540',
      work_model: 'hybrid',
      employment_type: 'part-time',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
    },
    {
      id: 13,
      user_id: 1,
      company_name: 'Maggio-Kutch',
      position:
        'Aut rem odit culpa nostrum omnis. Nisi numquam illum magnam et. Voluptatem molestias nihil sed ipsam ab aut. Veritatis enim possimus velit praesentium.',
      description:
        'Et at veniam et ea. Voluptatem magnam voluptas dolorem possimus. Sunt ut doloribus corporis quis nam. Cum modi dolores omnis eum qui. Ea ut cupiditate quas dolores sit totam et.',
      start_date: '2019-06-23',
      end_date: '2030-08-19',
      is_current: 0,
      location: '274 Stehr Dam Suite 038\nSouth Liza, LA 27142',
      work_model: 'homeOffice',
      employment_type: 'full-time',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
    },
    {
      id: 15,
      user_id: 1,
      company_name: 'Carroll, Funk and Pouros',
      position:
        'Alias magni placeat id voluptatem explicabo. Accusantium ratione perferendis doloribus aut. Est sit voluptas placeat saepe. Sit officiis voluptatem unde inventore.',
      description:
        'Omnis aliquam omnis nemo in. Officiis perferendis voluptatem est impedit dolor sequi. Consequuntur aperiam dolorum qui rerum et animi.',
      start_date: '2022-04-23',
      end_date: '2028-06-11',
      is_current: 0,
      location: '84841 Price Camp Apt. 507\nCameronborough, KY 59304-9752',
      work_model: 'homeOffice',
      employment_type: 'part-time',
      created_at: '2024-05-05T10:08:46.000000Z',
      updated_at: '2024-05-05T10:08:46.000000Z',
    },
  ],
};
