<script lang="ts" setup>
import SignInForm from 'components/form/SignInForm.vue';
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="grid-layout"
        style="background-color: blue-10; padding: 30px"
      >
        <div class="left-section">
          <div class="content">
            <img
              src="../assets/logo.jpg"
              alt="Logo"
              style="border-radius: 30px"
            />
          </div>
        </div>
        <div class="right-section">
          <div class="form-container">
            <SignInForm></SignInForm>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
@import '../css/signin.page.scss';
</style>
