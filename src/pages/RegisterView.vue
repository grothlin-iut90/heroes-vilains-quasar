<template>
  <q-page class="q-pa-md">
    <h1 class="text-h4 q-mb-md">Register</h1>
    <q-form
      @submit.prevent="submit"
      @validation-error="onValidationError"
      ref="formRef"
      greedy
    >
      <q-input
        v-model="login"
        label="Login"
        filled
        class="q-mb-md"
        :rules="[(val) => !!val || 'Login is required']"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        filled
        class="q-mb-md"
        :rules="[
          (val) => !!val || 'Password is required',
          (val) => val.length >= 6 || 'Password must be at least 6 characters'
        ]"
      />
      <q-input
        v-model="hero"
        label="Hero Name"
        filled
        class="q-mb-md"
        :rules="[(val) => !!val || 'Hero name is required']"
      />
      
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12">
          <q-btn 
            label="Verify Captcha" 
            color="secondary" 
            @click="verifyCaptcha" 
            :loading="verifyingCaptcha"
          />
        </div>
      </div>
      
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-btn 
            type="submit" 
            label="Register" 
            color="primary" 
            :disable="!captchaToken" 
            :loading="submitting"
          />
        </div>
      </div>
    </q-form>
    
    <q-dialog v-model="errorDialog">
      <q-card>
        <q-card-section class="row items-center bg-negative text-white">
          <div class="text-h6">Registration Error</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <p>{{ errorMessage }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { captchaSiteKey } from "@/commons/config";
import { useAuthStore } from "@/store/modules/auth";
import { useRecaptcha } from "vue-recaptcha-v3";

const router = useRouter();
const authStore = useAuthStore();
const formRef = ref(null);

// Form fields
const login = ref("");
const password = ref("");
const hero = ref("");

// UI states
const captchaToken = ref(null);
const verifyingCaptcha = ref(false);
const submitting = ref(false);
const errorDialog = ref(false);
const errorMessage = ref("");

// Recaptcha setup
const { executeRecaptcha } = useRecaptcha(captchaSiteKey);

const verifyCaptcha = async () => {
  try {
    verifyingCaptcha.value = true;
    const token = await executeRecaptcha('register');
    captchaToken.value = token;
    console.log("Captcha verified successfully");
  } catch (error) {
    errorMessage.value = "Failed to verify captcha. Please try again.";
    errorDialog.value = true;
    console.error("Captcha verification failed:", error);
  } finally {
    verifyingCaptcha.value = false;
  }
};

const onValidationError = (errors) => {
  console.log('Validation errors:', errors);
};

const submit = async () => {
  const isValid = await formRef.value.validate();
  if (!isValid) return;
  
  try {
    submitting.value = true;
    
    if (!captchaToken.value) {
      errorMessage.value = "Please verify captcha first";
      errorDialog.value = true;
      return;
    }
    
    const result = await authStore.registerUser({
      login: login.value,
      password: password.value,
      hero: hero.value,
      captchaToken: captchaToken.value,
    });
    
    if (result.error === 0) {
      router.push("/login");
    } else {
      errorMessage.value = result.data || "Registration failed. Please try again.";
      errorDialog.value = true;
    }
  } catch (error) {
    errorMessage.value = "An unexpected error occurred. Please try again.";
    errorDialog.value = true;
    console.error("Registration error:", error);
  } finally {
    submitting.value = false;
  }
};
</script>