<script setup>
// Import necessary modules
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useGeneralStore } from 'src/stores/modules/general'
import { useSecretStore } from 'src/stores/modules/secret'

// Define the prop
defineProps({
  organisationNames: {
    type: Array,
    required: true,
  },
})

// Stores
const generalStore = useGeneralStore()
const secretStore = useSecretStore()

// Router
const router = useRouter()

// Computed properties
const CurrentOrganisation = computed(() => generalStore.CurrentOrganisation)
const OrganisationPassword = computed(() => secretStore.OrganisationPassword)

// Methods
const selectOrganisation = async (orgId) => {
  await generalStore.getOrganisation({ id: orgId, secret: OrganisationPassword.value })
  if (CurrentOrganisation.value) {
    await router.push('/organisation')
  }
}
</script>

<template>
  <q-page class="q-pa-md">
    <div class="organisation-grid">
      <div v-for="(org, index) in organisationNames" :key="index" class="organisation-item">
        <q-card class="q-pa-md" bordered>
          <q-card-section>
            <div class="text-h6">{{ org.name }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Voir" @click="selectOrganisation(org._id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
.organisation-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Space between items */
}

.organisation-item {
  flex: 1 1 calc(25% - 16px); /* 4 items per row with spacing */
  max-width: calc(25% - 16px); /* Ensure items don't exceed 25% width */
  box-sizing: border-box; /* Include padding and border in width calculation */
}

@media (max-width: 1024px) {
  .organisation-item {
    flex: 1 1 calc(33.33% - 16px); /* 3 items per row on medium screens */
    max-width: calc(33.33% - 16px);
  }
}

@media (max-width: 768px) {
  .organisation-item {
    flex: 1 1 calc(50% - 16px); /* 2 items per row on small screens */
    max-width: calc(50% - 16px);
  }
}

@media (max-width: 480px) {
  .organisation-item {
    flex: 1 1 100%; /* 1 item per row on very small screens */
    max-width: 100%;
  }
}
</style>
