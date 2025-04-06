<script setup>
import { ref, computed } from 'vue'
import { useGeneralStore } from 'src/stores/modules/general'

// Pinia store
const generalStore = useGeneralStore()

// Reactive state
const dialog = ref(false)
const organisationName = ref('')
const password = ref('')
const showPassword = ref(false)

// Computed properties
const isFormValid = computed(() => {
  return organisationName.value.length > 0 && password.value.length > 0
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const cancel = () => {
  dialog.value = false
  organisationName.value = ''
  password.value = ''
}

const valid = async () => {
  dialog.value = false
  await generalStore.newOrganisation({
    name: organisationName.value,
    password: password.value,
  })
  organisationName.value = ''
  password.value = ''
}

const displayDialog = () => {
  dialog.value = true
}

defineExpose({
  displayDialog
})
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Nouvelle organisation</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="organisationName" label="Entrez le nom de l'organisation" filled />
        <q-input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Entrez la phrase secrète"
          filled
          :suffix="showPassword ? 'visibility' : 'visibility_off'"
          @click-suffix="togglePasswordVisibility"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="negative" @click="cancel" />
        <q-btn flat label="Valider" color="positive" :disable="!isFormValid" @click="valid" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
/* Add any scoped styles here if needed */
</style>
