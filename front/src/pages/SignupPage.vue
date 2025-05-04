<script lang="ts" setup>
import SignupForm from 'components/form/SignupForm.vue';
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="grid-layout"
        style="background-color: blue-10; padding: 30px"
      >
        <div class="left-section">
          <h1
            class="text-h5 text-center"
            style="font-family: Poppins, sans-serif; line-height: 50px"
          >
            <p>
              Bem-vindo ao ICEx HUB <br />
              Faça seu cadastro e tenha acesso a novas funcionalidades <br />
            </p>
            <img
              src="../assets/logo.jpg"
              alt="Logo"
              style="border-radius: 30px"
            />
          </h1>
        </div>
        <div class="right-section">
          <SignupForm></SignupForm>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
@import '../css/signup.page.scss';
</style>
