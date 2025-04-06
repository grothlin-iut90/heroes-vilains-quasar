<script>
import { ref } from 'vue';
import EditHero from 'src/components/EditHero.vue';
import { useGeneralStore } from 'src/stores/modules/general';

export default {
  name: 'EditHeroDialog',
  components: { EditHero },
  props: {
    hero: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const dialog = ref(false);
    const generalStore = useGeneralStore();

    const closeDialog = () => {
      dialog.value = false;
    };

    const handleValid = async (updatedHeroData) => {
      if (props.hero && props.hero._id) {
        // Combine the updated data with the hero ID
        const heroToUpdate = {
          _id: props.hero._id,
          realName: updatedHeroData.realName,
          publicName: updatedHeroData.publicName,
          powers: updatedHeroData.powers
        };

        console.log('Updating hero:', heroToUpdate);

        // Call the updateHero method from the store
        await generalStore.updateHero(heroToUpdate);

        // Close the dialog after successful update
        closeDialog();
      } else {
        console.error('Cannot update hero: Missing hero ID');
      }
    };

    return {
      dialog,
      closeDialog,
      handleValid,
    };
  },
};
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <EditHero
      :hero="hero"
      @cancel="closeDialog"
      @valid="handleValid"
    />
  </q-dialog>
</template>