<script setup>
import { ref, watch, computed } from 'vue'
import { useGeneralStore } from 'src/stores/modules/general'

const generalStore = useGeneralStore()

const props = defineProps({
  hero: {
    type: Object,
    required: true,
  },
})

// computed
const formattedHeroPowerTypes = computed(() =>
  generalStore.HeroPowerTypes.map((obj) => ({
    text: obj.label,
    value: obj.value,
  })),
)

// Reactive fields
const realName = ref('')
const publicName = ref('')
const powers = ref([])

console.log('powers', powers)

// Copy initial hero values
const copyValues = () => {
  realName.value = props.hero.realName
  publicName.value = props.hero.publicName
  powers.value = props.hero.powers.map((power) => ({
    name: power.name,
    type: Number(power.type),
    level: Number(power.level),
  }))
}

const deletePower = (index) => {
  powers.value.splice(index, 1)
}


// Reset form to initial values
const reset = () => {
  copyValues()
}

const addPower = () => {
  powers.value.push({
    name: '',
    type: formattedHeroPowerTypes.value[0]?.value || 1,
    level: 0,
  })
  console.log('formattedHeroPowerTypes', formattedHeroPowerTypes.value)
  console.log('powers', powers.value)
}

// Watch for changes to the prop
watch(() => props.hero, copyValues, { immediate: true })
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="q-mb-md">
        <q-input v-model="realName" label="Nom réel" />
      </div>
      <div class="q-mb-md">
        <q-input v-model="publicName" label="Nom public" />
      </div>

      <q-btn
        @click="addPower"
        color="primary"
        icon="mdi-plus"
        label="Ajouter un pouvoir"
        class="q-mb-md"
      />

      <div class="q-mb-md" v-for="(power, index) in powers" :key="index">
        <q-input v-model="power.name" label="Nom du pouvoir" class="q-mb-sm" />
        <q-select
          v-model="power.type"
          :options="formattedHeroPowerTypes"
          option-label="text"
          option-value="value"
          label="Choisir un type"
          emit-value
          map-options
          class="q-mb-sm"
        />
        <q-input
          v-model.number="power.level"
          type="number"
          label="Niveau du pouvoir"
          :min="0"
          class="q-mb-sm"
        />
        <q-btn
          color="negative"
          label="Supprimer ce pouvoir"
          icon="mdi-delete"
          flat
          @click="deletePower(index)"
          class="q-mb-md"
        />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn color="negative" label="Annuler" @click="$emit('cancel')" />
      <q-btn
        color="positive"
        label="Valider"
        :disable="
          !realName ||
          !publicName ||
          powers.some((p) => !p.name || !p.type || p.level < 0 || p.level > 100)
        "
        @click="($emit('valid', { realName, publicName, powers }), reset())"
      />
    </q-card-actions>
  </q-card>
</template>
