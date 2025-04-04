<template>
  <q-page>
    <h1>Organisations</h1>
    <q-btn color="primary" @click="newOrganisation" class="mb-4">Ajouter</q-btn>
    <OrganisationsList :organisationNames="organisationNames" />
    <NewOrganisationDialog ref="addOrgDialogRef" />
  </q-page>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import OrganisationsList from 'src/components/OrganisationsList.vue'
import NewOrganisationDialog from 'src/components/NewOrganisationDialog.vue'
import { useGeneralStore } from 'src/stores/modules/general'

const generalStore = useGeneralStore()
const addOrgDialogRef = ref(null)

const organisationNames = computed(() => generalStore.OrganisationNames)
const sortedOrganisationNames = ref([])

const newOrganisation = () => {
  addOrgDialogRef.value.displayDialog()
}

onMounted(() => {
  generalStore.getOrganisations()
  sortedOrganisationNames.value = [...organisationNames.value].sort((a, b) =>
    a.name.localeCompare(b.name),
  )
})

watch(organisationNames, (newVal) => {
  sortedOrganisationNames.value = [...newVal].sort((a, b) => a.name.localeCompare(b.name))
})
</script>
