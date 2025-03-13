import { JobApplication } from 'protocols/external/job/job-application';

export const mockJobApplication: JobApplication[] = [
	{
		id: 1,
		job_id: 17,
		user_id: 1,
		status: 'pending',
		cover_letter:
			'Gostaria de me candidatar à vaga de Tech Lead | Node.js (Híbrido - BH) na Onfly. Acredito que minhas habilidades e experiências são uma excelente combinação para esta posição. Tenho 5 anos de experiência na área de atuação. Durante esse período, desenvolvi as habilidades necessárias.\nSou uma pessoa relevante, como organizada, dedicada, comunicativa, e acredito que essas qualidades me tornam um bom candidato para a vaga. Estou ansioso para a oportunidade de contribuir para a equipe da Onfly.',
		created_at: '2024-05-28T19:13:40.000000Z',
		updated_at: '2024-05-28T19:13:40.000000Z',
		candidates: [
			{
				id: 1,
				name: 'test',
				type: 'employee',
				phone: '999999999',
				email: 'candidato@gmail.com',
				email_verified_at: null,
				about_me: null,
				profile_picture_path: null,
			},
		],
		job: {
			id: 17,
			name: 'Tech Lead | Node.js (Híbrido - BH)',
			description:
				'Para a vaga de Tech Lead | Node.js, buscamos um(a) profissional que será responsável por um dos nossos Squads de tecnologia, tanto do ponto de gestão quanto de desenvolvimento.',
			is_available: 1,
			applications_amount: 10,
			salary: 3200,
			salary_time_unit: 'month',
			accept_application_until: '2024-05-28 23:59:59',
			work_model: 'hybrid',
			employment_type: 'full-time',
			week_workload: 40,
			location: 'Belo Horizonte, Minas Gerais, Brasil',
			company_id: 1,
			created_at: '2024-05-28T19:13:19.000000Z',
			updated_at: '2024-05-28T19:13:19.000000Z',
			user_id: 3,
		},
	},
];
