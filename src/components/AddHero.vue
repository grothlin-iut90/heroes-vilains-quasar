<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGeneralStore } from 'src/stores/modules/general'
import EditHero from 'src/components/EditHero.vue'
import RecruitHero from 'src/components/RecruitHero.vue'

// Pinia store
const generalStore = useGeneralStore()

const heroes = ref([])

onMounted(async () => {
  // Ensure we properly await the result and assign it to the ref
  const result = await generalStore.getHeroAliases()
  console.log('Fetched heroes:', result)
  if (result) {
    heroes.value = result
    console.log('Heroes:', heroes.value)
  }
})

// Props
const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  onClose: {
    type: Function,
    default: () => {},
  },
})

// Reactive state
const activeTab = ref(0)
const emptyHero = ref({ publicName: '', realName: '', powers: [] })

const CurrentTeam = computed(() => {
  console.log('CurrentTeam:', generalStore.CurrentTeam)
  return generalStore.CurrentTeam
})

const handleClose = () => {
  if (props.onClose) {
    props.onClose()
  }
}

const createNewHero = async (heroData) => {
  try {
    // S'assurer que tous les champs sont correctement formatés
    const hero = {
      realName: heroData.realName,
      publicName: heroData.publicName,
      powers: heroData.powers.map((power) => ({
        name: power.name,
        type: parseInt(power.type), // S'assurer que le type est un nombre
        level: parseInt(power.level), // S'assurer que le niveau est un nombre
      })),
    }

    console.log('Données du héros à envoyer:', hero)

    hero.powers = hero.powers.map((power) => ({
      ...power,
      type: Number.isNaN(Number(power.type)) ? 0 : Number(power.type),
    }))
    console.log('Héros formaté:', hero)

    const creation = await generalStore.createHero(hero)
    console.log('Hero created:', creation)

    if (creation && creation._id && CurrentTeam.value) {
      let id = creation._id
      let data = {
        idTeam: CurrentTeam.value._id,
        heroes: [id],
      }
      console.log('Adding hero to team:', data)
      await generalStore.addHeroesToTeam(data)
    }
  } catch (error) {
    console.error('Error creating hero:', error)
  }
}
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Ajouter un héro</div>
    </q-card-section>

    <q-card-section>
      <q-btn
        flat
        :color="activeTab === 0 ? 'primary' : 'grey'"
        label="Recruter un héro"
        @click="activeTab = 0"
      />
      <q-btn
        flat
        :color="activeTab === 1 ? 'primary' : 'grey'"
        label="Créer un héro"
        @click="activeTab = 1"
      />
    </q-card-section>

    <div v-if="activeTab === 0">
      <RecruitHero :heroes="heroes" @onCancel="handleClose" />
    </div>

    <div v-else-if="activeTab === 1">
      <q-card-section>
        <EditHero :hero="emptyHero" @cancel="handleClose" @valid="createNewHero" />
      </q-card-section>
    </div>
  </q-card>
</template>
