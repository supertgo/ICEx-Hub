<script setup lang="ts">
import { required } from 'src/utils/userValidation';
import { ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import type { UpdateNameData } from 'src/types/auth';
import ErrorDialog from 'components/common/ErrorDialog.vue';
import { Routes } from 'src/enums/Routes';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import NameInput from 'components/inputs/user/NameInput.vue';

const name = ref<string>('');
const errorRef = ref<boolean>(false);
const message = ref<string>('');
const router = useRouter();

const onSubmit = async (event: Event) => {
  event.preventDefault();
  const authStore = useAuthStore();
  const data = {
    name: name.value,
  } as UpdateNameData;

  try {
    await authStore.updateName(data);
    Notify.create({
      type: 'positive',
      message: 'Nome alterado com sucesso',
      timeout: 2000,
    });

    void router.push({ name: Routes.HOME });
  } catch {
    errorRef.value = true;
    message.value = 'Algo deu errado. Tente novamente mais tarde';
  }
};
</script>

<template>
  <q-card class="q-pa-md" style="max-width: 400px; width: 100%">
    <h2 class="text-h6 text-center">Alterar nome</h2>
    <q-form @submit="onSubmit">
      <NameInput v-model="name" :rules="[required]"></NameInput>

      <div>
        <q-btn
          type="submit"
          label="Alterar"
          color="primary"
          class="full-width"
        ></q-btn>
      </div>
    </q-form>
  </q-card>

  <ErrorDialog v-model:isVisible="errorRef" :message="message" />
</template>

<style scoped></style>
