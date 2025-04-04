<script>
import { ref } from "vue";
import EditHero from "@/components/EditHero.vue";

export default {
  name: "EditHeroDialog",
  components: { EditHero },
  props: {
    hero: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false);

    const displayDialog = () => {
      dialog.value = true;
    };

    const saveHero = (updatedHero) => {
      emit("valid", updatedHero);
      dialog.value = false;
    };

    return {
      dialog,
      displayDialog,
      saveHero,
    };
  },
};
</script>

<template>
  <q-dialog v-model="dialog">
    <EditHero :hero="hero" @cancel="dialog = false" @valid="saveHero" />
  </q-dialog>
</template>