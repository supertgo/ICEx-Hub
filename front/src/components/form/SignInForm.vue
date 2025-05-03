<script setup lang="ts">
import EmailInput from 'components/inputs/user/EmailInput.vue';
import PasswordInput from 'components/inputs/user/PasswordInput.vue';
import AppBrand from '../AppBrand.vue';
import { email, required } from 'src/utils/userValidation';
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import type { SignInData } from 'src/types/auth';
import axios from 'axios';
import ErrorDialog from 'components/common/ErrorDialog.vue';
import { Routes } from 'src/enums/Routes';
import { useRouter } from 'vue-router';

const emailRef = ref<string>('');
const password = ref<string>('');
const errorRef = ref<boolean>(false);
const message = ref<string>('');
const router = useRouter();

const onSubmit = async (event: Event) => {
  event.preventDefault();
  const authStore = useAuthStore();

  const data = {
    email: emailRef.value,
    password: password.value,
  } as SignInData;

  try {
    await authStore.signIn(data);

    const callbackUrl = router.currentRoute.value.query.callbackUrl as string;

    if (callbackUrl) {
      await router.push(callbackUrl);
      return;
    }

    await router.push({ name: Routes.HOME });
  } catch (error) {
    errorRef.value = true;
    message.value = 'Erro';

    if (axios.isAxiosError(error)) {
      if (error.status == 400) {
        if (error.response?.data?.message === `Invalid credentials`) {
          message.value = 'Email ou senha inválidos';
        }
      } else if (error.status === 404) {
        message.value = 'Usuário não foi encontrado';
      }
    }
  }
};
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 500px; width: 100%">
    <h2 class="text-h6 text-center">
      <AppBrand></AppBrand>
    </h2>
    <q-form @submit="onSubmit">
      <EmailInput v-model="emailRef" :rules="[required, email]" />

      <PasswordInput v-model="password" :rules="[required]" />

      <div>
        <q-btn
          type="submit"
          label="Entrar"
          color="blue-10"
          class="full-width"
        ></q-btn>
      </div>
    </q-form>

    <q-btn
      class="full-width q-mt-sm"
      flat
      dense
      no-caps
      color="blue-10"
      label="Não possui uma conta? Cadastre-se"
      @click="$router.push({ name: Routes.SIGNUP })"
    ></q-btn>
  </q-card>

  <ErrorDialog v-model:isVisible="errorRef" :message="message" />
</template>

<style scoped></style>
