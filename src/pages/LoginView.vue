<template>
  <q-page>
    <h1>Login</h1>
    <q-form ref="form" v-model="valid">
      <q-input v-model="loginInput" label="Login" filled />
      <q-input v-model="password" label="Password" type="password" filled />
      <q-btn :disable="!valid" @click="submit">Login</q-btn>
      <q-btn @click="router.push('/register')">Register</q-btn>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";

const router = useRouter();
const authStore = useAuthStore();

const loginInput = ref("");
const password = ref("");
const valid = ref(false);
const errorMessage = ref("");

const submit = async () => {
  const success = await authStore.login({
    login: loginInput.value,
    password: password.value,
  });
  if (success) {
    await authStore.fetchUser(loginInput.value);
    router.push("/");
  } else {
    errorMessage.value = "Invalid login or password.";
  }
};
</script>