<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGeneralStore } from 'src/stores/modules/general'

// Pinia store
const generalStore = useGeneralStore()

// Reactive state
const dialog = ref(false)
const selectedTeam = ref(null)

// Computed properties
const sortedTeams = computed(() => {
  return generalStore.Teams.filter(
    (team) => !generalStore.CurrentOrganisation.teams.some((orgTeam) => team._id === orgTeam._id),
  ).sort((a, b) => (a.name > b.name ? 1 : -1))
})

const addTeam = async () => {
  dialog.value = false
  await generalStore.addTeamToOrganisation({
    idTeam: selectedTeam.value._id,
    nameTeam: selectedTeam.value.name,
  })
  selectedTeam.value = null
}

// Lifecycle hooks
onMounted(async () => {
  console.log('AddTeamDialog mounted: ', dialog.value)
  await generalStore.getTeams()
})

defineExpose({ dialog })
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Ajouter une équipe</div>
      </q-card-section>
      <q-card-section>
        <q-virtual-scroll :items="sortedTeams" scroll-target="self" style="max-height: 400px">
          <template v-slot="{ item }">
            <q-item>
              <q-item>
                <q-checkbox
                  :model-value="selectedTeam && selectedTeam._id === item._id"
                  :label="item.name"
                  @update:model-value="selectedTeam = $event ? item : null"
                />
              </q-item>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="negative" @click="dialog = false" />
        <q-btn flat label="Ajouter" color="positive" :disable="!selectedTeam" @click="addTeam" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
