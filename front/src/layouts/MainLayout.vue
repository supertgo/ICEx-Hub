<style lang="scss">
@import '../css/index.page.scss';
</style>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { Routes } from 'src/enums/Routes';
import UserInfo from 'src/components/UserInfo.vue';
import AppBrand from 'src/components/AppBrand.vue';

const drawer = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const user = authStore.user;

const logout = async () => {
  authStore.logout();
  await router.push({ name: Routes.SIGN_IN });
};

watch(
  () => router.currentRoute.value,
  () => {
    drawer.value = false;
  },
);
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-blue-10 header">
      <q-toolbar class="header-toolbar">
        <AppBrand />
        <q-space />
        <q-btn
          v-if="!!user"
          icon="account_circle"
          round
          flat
          dense
          @click="drawer = !drawer"
        ></q-btn>

        <q-btn
          v-if="!user"
          icon="login"
          round
          flat
          dense
          v-ripple
          @click="$router.push({ name: Routes.SIGN_IN })"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer side="right" v-model="drawer">
      <q-scroll-area class="fit">
        <UserInfo />
        <q-list class="menu-list">
          <q-item clickable v-ripple @click="logout">
            <q-item-section avatar>
              <q-icon name="logout"></q-icon>
            </q-item-section>
            <q-item-section>Sair</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            @click="$router.push({ name: Routes.UPDATE_PASSWORD })"
          >
            <q-item-section avatar>
              <q-icon name="lock"></q-icon>
            </q-item-section>
            <q-item-section>Alterar senha</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            @click="$router.push({ name: Routes.UPDATE_NAME })"
          >
            <q-item-section avatar>
              <q-icon name="badge"></q-icon>
            </q-item-section>
            <q-item-section>Alterar nome</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
