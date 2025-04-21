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
import { Notify } from 'quasar';

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
      Cookies.set('authorization_token', this.user.token!, {
        sameSite: 'Strict',
      });

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
        console.log(error);
        const message = 'Não foi possível recuperar seu login';
        Cookies.remove('authorization_token');

        Notify.create({
          type: 'negative',
          message,
          timeout: 2000,
        });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
