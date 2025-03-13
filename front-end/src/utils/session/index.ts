import { getSession } from 'next-auth/react';

export async function getUserInfo() {
	return await getSession();
}
