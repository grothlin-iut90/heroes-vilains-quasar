<template>
  <q-dialog v-model="dialog" persistent>
    <AddHero :dialog="dialog" @close="closeDialog" />
  </q-dialog>
</template>

<script>
import { ref } from 'vue';
import AddHero from 'src/components/AddHero.vue';

export default {
  name: 'AddHeroDialog',
  components: { AddHero },
  setup() {
    const dialog = ref(false);

    const closeDialog = () => {
      dialog.value = false; // Close the dialog
    };

    return {
      dialog,
      closeDialog,
    };
  },
};
</script>