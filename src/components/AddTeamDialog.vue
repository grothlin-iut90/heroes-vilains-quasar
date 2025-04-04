<script>
import { ref } from "vue";

export default {
  name: "AddTeamDialog",
  setup() {
    const dialog = ref(false);
    const teamName = ref("");

    const displayDialog = () => {
      dialog.value = true;
    };

    const createTeam = () => {
      dialog.value = false;
      return teamName.value;
    };

    return {
      dialog,
      teamName,
      displayDialog,
      createTeam,
    };
  },
};
</script>

<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <div class="text-h6">Créer une équipe</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="teamName" label="Nom de l'équipe" filled />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="negative" @click="dialog = false" />
        <q-btn flat label="Créer" color="positive" @click="createTeam" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
