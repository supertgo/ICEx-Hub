<template>
  <q-item class="q-pa-md">
    <q-item-section avatar>
      <q-avatar size="56px">
        {{ `${user?.name[0]}${user?.name[1]}` }}
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ user?.name }}</q-item-label>
      <q-item-label caption>{{ user?.email }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-separator />
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth';

const authStore = useAuthStore();

const user = authStore.user;
</script>
