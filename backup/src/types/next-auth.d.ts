import 'next-auth/jwt';
import { UserType } from 'protocols/external/user/user';

declare module 'next-auth' {
	interface Session {
		id: number;
		access_token?: string;
		email: string;
		name: string;
		type: UserType;
	}

	interface User {
		id?: string;
		access_token?: string;
		error?: string;
	}
}
