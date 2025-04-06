<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useGeneralStore } from 'src/stores/modules/general'

const props = defineProps({
  heroes: Array,
})

const emit = defineEmits(['onCancel'])

const generalStore = useGeneralStore()
const selectedHeroes = reactive({})

const initializeSelection = (heroes) => {
  if (!heroes) return
  heroes.forEach((hero) => {
    selectedHeroes[hero._id] = false
  })
}

// Function to add selected heroes to the team
const addSelectedHeroes = async () => {
  const selectedIds = Object.keys(selectedHeroes).filter((id) => selectedHeroes[id])

  if (selectedIds.length > 0 && generalStore.CurrentTeam) {
    const data = {
      idTeam: generalStore.CurrentTeam._id,
      heroes: selectedIds,
    }
    await generalStore.addHeroesToTeam(data)
    emit('onCancel')
  }
}

onMounted(() => {
  if (props.heroes && props.heroes.length) {
    initializeSelection(props.heroes)
  }
})

watch(
  () => props.heroes,
  (newHeroes) => {
    if (newHeroes && newHeroes.length) {
      initializeSelection(newHeroes)
    }
  },
  { immediate: true },
)
</script>

<template>
  <q-card>
    <q-card-section class="text-h6"> Recruter un héro existant </q-card-section>

    <q-card-section>
      <q-virtual-scroll :items="props.heroes" style="max-height: 350px" virtual-scroll-item-size="0" scroll-target="self">
        <template #default="{ item: hero }">
          <q-item>
            <q-checkbox v-model="selectedHeroes[hero._id]" :label="hero.publicName" />
          </q-item>
        </template>
      </q-virtual-scroll>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn label="Annuler" @click="$emit('onCancel')" />
      <q-btn label="Ajouter" color="primary" @click="addSelectedHeroes" />
    </q-card-actions>
  </q-card>
</template>
