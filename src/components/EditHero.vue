<script>
import { ref, watch } from "vue";

export default {
  name: "EditHero",
  props: {
    hero: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const localHero = ref({ ...props.hero });

    watch(
      () => props.hero,
      (newHero) => {
        localHero.value = { ...newHero };
      }
    );

    const cancel = () => {
      emit("cancel");
    };

    const save = () => {
      emit("valid", localHero.value);
    };

    return {
      localHero,
      cancel,
      save,
    };
  },
};
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Modifier un héros</div>
    </q-card-section>
    <q-card-section>
      <q-input v-model="localHero.publicName" label="Nom public" filled />
      <q-input v-model="localHero.realName" label="Nom réel" filled />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Annuler" color="negative" @click="cancel" />
      <q-btn flat label="Enregistrer" color="positive" @click="save" />
    </q-card-actions>
  </q-card>
</template>