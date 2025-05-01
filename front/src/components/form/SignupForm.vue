<script setup lang="ts">
import NameInput from 'components/inputs/user/NameInput.vue';
import EmailInput from 'components/inputs/user/EmailInput.vue';
import PasswordInput from 'components/inputs/user/PasswordInput.vue';
import RepeatPasswordInput from 'components/inputs/user/RepeatPasswordInput.vue';
import { email, passwordMatch, required } from 'src/utils/userValidation';
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import type { SignupData } from 'src/types/auth';
import axios from 'axios';
import ErrorDialog from 'components/common/ErrorDialog.vue';
import { Routes } from 'src/enums/Routes';
import { useRouter } from 'vue-router';
import CourseAutocomplete from 'components/inputs/course/CourseAutocomplete.vue';
import CoursePeriodAutocomplete from 'components/inputs/course-period/CoursePeriodAutocomplete.vue';

const name = ref<string>('');
const emailRef = ref<string>('');
const password = ref<string>('');
const courseId = ref<string>('');
const coursePeriodId = ref<string>('');
const repeatPassword = ref<string>('');
const errorRef = ref<boolean>(false);
const message = ref<string>('');
const route = useRouter();

const onSubmit = async (event: Event) => {
  event.preventDefault();
  const authStore = useAuthStore();
  const data = {
    email: emailRef.value,
    name: name.value,
    password: password.value,
    courseId: courseId.value,
    coursePeriodId: coursePeriodId.value,
  } as SignupData;

  try {
    await authStore.signup(data);
    await route.push({ name: Routes.SIGN_IN });
  } catch (error) {
    errorRef.value = true;
    message.value = 'Erro';

    if (axios.isAxiosError(error)) {
      if (error.status == 409) {
        if (
          error.response?.data?.message ===
          `User with email ${emailRef.value} already exists`
        ) {
          message.value = `Usuário com o email ${emailRef.value} já existe`;
        }
      }
    }
  }
};
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 800px; width: 100%">
    <h2 class="text-h6 text-center">Cadastrar</h2>
    <q-form @submit="onSubmit">
      <q-card-section class="row q-gutter-md">
        <NameInput class="col" v-model="name" :rules="[required]" />

        <EmailInput class="col" v-model="emailRef" :rules="[required, email]" />
      </q-card-section>

      <q-card-section class="row q-gutter-md">
        <PasswordInput class="col" v-model="password" :rules="[required]" />
        <RepeatPasswordInput
          class="col"
          v-model="repeatPassword"
          :rules="[required, passwordMatch(password)]"
        />
      </q-card-section>

      <q-card-section class="row q-gutter-md">
        <course-autocomplete
          class="col"
          v-model="courseId"
          :rules="[required]"
          label="Curso"
        />
        <course-period-autocomplete
          class="col"
          v-model="coursePeriodId"
          :rules="[required]"
          :courseId="courseId"
          label="Período"
        />
      </q-card-section>

      <div>
        <q-btn
          type="submit"
          label="Registrar"
          color="primary"
          class="full-width"
        ></q-btn>
      </div>
    </q-form>
    <q-btn
      class="q-pt-md"
      flat
      dense
      no-caps
      color="primary"
      label="Já possui cadastro? Faça login"
      @click="$router.push({ name: Routes.SIGN_IN })"
    ></q-btn>
  </q-card>

  <ErrorDialog v-model:isVisible="errorRef" :message="message" />
</template>

<style scoped></style>
