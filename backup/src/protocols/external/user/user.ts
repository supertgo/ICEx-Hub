export const enum UserEnum {
	RECRUITER = 'recruiter',
	EMPLOYEE = 'employee',
}

export type UserType = `${UserEnum}`;

export type UserIncludeOption =
	| 'competences'
	| 'academicRecords'
	| 'professionalExperiences';

export type UserProps = {
	id: number;
	name: string;
	password?: string;
	email: string;
	phone: string;
	type: UserType;
	about_me: string | null;
	profile_picture_path?: string;
};

export type UserAuthRegister = Pick<
	UserProps,
	'name' | 'email' | 'password' | 'type' | 'phone'
>;

export type ShowUsersResponse = {
	data: UserProps[];
};

export type ShowUserResponse = {
	data: UserProps;
};

export type GetUserResponse = {
	data: Omit<UserProps, 'password'>;
};
