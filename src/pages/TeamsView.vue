<template>
  <q-page>
    <h1>Teams</h1>
    <q-btn color="primary" @click="newTeam" class="mb-4">Ajouter</q-btn>
    <NewTeamDialog ref="newTeamDialogRef" />
    <TeamsList :teams="Teams" />
  </q-page>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import TeamsList from 'src/components/TeamsList.vue'
import NewTeamDialog from 'src/components/NewTeamDialog.vue'
import { useGeneralStore } from 'src/stores/modules/general'

const generalStore = useGeneralStore()
const newTeamDialogRef = ref(null)

const Teams = computed(() => generalStore.Teams)

const newTeam = () => {
  newTeamDialogRef.value.dialog = true
}

onMounted(() => {
  generalStore.getTeams()
})
</script>
