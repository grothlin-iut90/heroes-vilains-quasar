<template>
  <q-page>
    <h1>Login</h1>
    <q-form ref="form" v-model="isValid">
      <q-input
        v-model="loginInput"
        label="Login"
        :rules="[val => !!val || 'Login is required']"
      />
      <q-input
        v-model="password"
        label="Password"
        type="password"
        :rules="[val => !!val || 'Password is required']"
      />
      <q-btn :disable="!isValid" @click="submit">Login</q-btn>
      <q-btn flat @click="redirectToRegister">Register</q-btn>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/modules/auth'

const router = useRouter()
const authStore = useAuthStore()

// Form state
const loginInput = ref('')
const password = ref('')
const errorMessage = ref('')

// Methods
const isValid = () => {
  return loginInput.value && password.value
}

const submit = async () => {
  const success = await authStore.login({
    login: loginInput.value,
    password: password.value,
  })

  if (success) {
    await authStore.fetchUser(loginInput.value)
    router.push('/')
  } else {
    errorMessage.value = 'Invalid login or password.'
  }
}

const redirectToRegister = () => {
  router.push('/register')
}
</script>