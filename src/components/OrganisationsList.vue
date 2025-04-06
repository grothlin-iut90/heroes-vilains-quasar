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
    <div class="team-grid">
      <div v-for="(org, index) in organisationNames" :key="index" class="organisation-item">
        <q-card-actions align="left">
          <q-btn class="button-orga" @click="selectOrganisation(org._id)">{{ org.name }}</q-btn>
        </q-card-actions>
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

.button-orga {
  width: 100%; /* Full width of the card */
  text-align: left; /* Align text to the left */
  padding: 16px; /* Padding inside the button */
  background-color: #f0f0f0; /* Light background color */
  border-radius: 4px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.organisation-item {
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
