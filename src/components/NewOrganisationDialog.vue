<script>
import { ref } from "vue";

export default {
  name: "NewOrganisationDialog",
  setup(_, { emit }) {
    const dialog = ref(false);
    const organisationName = ref("");

    const displayDialog = () => {
      dialog.value = true;
    };

    const createOrganisation = () => {
      emit("create", organisationName.value);
      dialog.value = false;
    };

    return {
      dialog,
      organisationName,
      displayDialog,
      createOrganisation,
    };
  },
};
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Créer une organisation</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="organisationName" label="Nom de l'organisation" filled />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="negative" @click="dialog = false" />
        <q-btn flat label="Créer" color="positive" @click="createOrganisation" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>