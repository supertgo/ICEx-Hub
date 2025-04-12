import { acceptHMRUpdate, defineStore } from 'pinia';
import { Cookies } from 'quasar';
import {
  signIn,
  signup,
  updateName,
  updatePassword,
  verifyToken,
} from 'src/api/userApi';
import type {
  SignInData,
  SignupData,
  UpdateNameData,
  UpdatePasswordData,
  User,
} from 'src/types/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this?.user?.token;
    },
  },
  actions: {
    async signup(data: SignupData): Promise<void> {
      this.user = await signup(data);
      Cookies.set('authorization_token', this.user.token!);
    },
    async updatePassword(data: UpdatePasswordData): Promise<void> {
      if (!this.user) {
        return;
      }
      await updatePassword(data, this.user.id);
    },
    async updateName(data: UpdateNameData): Promise<void> {
      if (!this.user) {
        return;
      }
      const updateUser = await updateName(data, this.user.id);
      this.user.name = updateUser.name;
    },
    async signIn(data: SignInData): Promise<User> {
      this.user = await signIn(data);

      return this.user;
    },
    logout(): void {
      this.user = null;
      Cookies.remove('authorization_token');
    },

    async initializeAuth(): Promise<void> {
      const token = Cookies.get('authorization_token');

      if (!token) {
        return;
      }

      try {
        this.user = await verifyToken(token);
      } catch (error) {
        this.user = null;
        Cookies.remove('authorization_token');
        console.log(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
