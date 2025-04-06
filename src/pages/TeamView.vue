<template>
  <div class="TeamView">
    <h1>Équipe: {{ CurrentTeam.name }}</h1>
    <div v-if="!CurrentTeam">
      <h2>Aucune équipe sélectionnée</h2>
      <q-btn color="positive" @click="router.push('/organisations')">OK</q-btn>
    </div>
    <q-table v-else :rows="CurrentTeam.members" :columns="columns" row-key="_id">
      <template v-slot:top>
        <q-btn color="positive" @click="openAddDialog">Ajouter</q-btn>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn color="warning" @click="selectHero(props.row)">Modifier</q-btn>
        <q-btn color="negative" @click="removeHero(props.row)">Supprimer</q-btn>
      </template>
    </q-table>
    <AddHeroDialog ref="addHeroDialogRef" />
    <EditHeroDialog ref="editHeroDialogRef" :hero="selectedHero" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGeneralStore } from 'src/stores/modules/general'
import AddHeroDialog from 'src/components/AddHeroDialog.vue'
import EditHeroDialog from 'src/components/EditHeroDialog.vue'

const router = useRouter()
const generalStore = useGeneralStore()

const addHeroDialogRef = ref(null)
const editHeroDialogRef = ref(null)
const selectedHero = ref(null)

const CurrentTeam = computed(() => generalStore.CurrentTeam)

const columns = [
  { name: 'publicName', label: 'Nom public', field: 'publicName' },
  { name: 'realName', label: 'Nom réel', field: 'realName' },
  { name: 'actions', label: 'Actions', align: 'left' },
]

const openAddDialog = () => {
  console.log('Opening AddHeroDialog...')
  addHeroDialogRef.value.dialog = true
}

const selectHero = (hero) => {
  console.log('Selected hero for editing:', hero)
  // Create a deep copy of the hero to avoid modifying the original
  selectedHero.value = JSON.parse(JSON.stringify(hero))
  // Open the dialog
  editHeroDialogRef.value.dialog = true
}

const removeHero = async (hero) => {
  console.log('Removing hero from team:', hero)
  if (CurrentTeam.value) {
    const data = {
      idTeam: CurrentTeam.value._id,
      heroes: [hero._id]
    }
    await generalStore.removeHeroesFromTeam(data)
  }
}
</script>