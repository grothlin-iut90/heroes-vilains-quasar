<template>
  <q-page padding>
    <h1>Register</h1>
    <q-form ref="form" @submit="submit" class="q-gutter-md">
      <q-input v-model="login" label="Login" :rules="[val => !!val || 'Login is required']" />
      <q-input v-model="password" label="Password" type="password" :rules="[val => !!val || 'Password is required']" />
      <q-input v-model="hero" label="Hero Name" :rules="[val => !!val || 'Hero Name is required']" />
      <vue-recaptcha ref="recaptcha" :sitekey="captchaSiteKey" @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"></vue-recaptcha>
      <q-btn type="submit" :disable="!isFormValid || !captchaToken" label="Register" color="primary" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/modules/auth';
import { captchaSiteKey } from "src/commons/config";
import { VueRecaptcha } from "vue-recaptcha";

const router = useRouter();
const authStore = useAuthStore();

const login = ref('');
const password = ref('');
const hero = ref('');
const captchaToken = ref(null);
const form = ref(null);

const isFormValid = computed(() => {
  return !!login.value && !!password.value && !!hero.value;
});

const onCaptchaVerified = (token) => {
  captchaToken.value = token;
};

const onCaptchaExpired = () => {
  captchaToken.value = null;
};

const submit = async () => {
  if (!isFormValid.value || !captchaToken.value) return;

  const result = await authStore.registerUser({
    login: login.value,
    password: password.value,
    hero: hero.value,
    captchaToken: captchaToken.value,
  });

  if (result.error === 0) {
    router.push('/login');
  } else {
    console.log(result.data);
  }
};
</script>