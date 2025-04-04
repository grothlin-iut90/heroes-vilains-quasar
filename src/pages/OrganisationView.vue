<template>
  <q-page>
    <h1>Organisation</h1>
    <div v-if="!currentOrganisation">
      <h2>Aucune organisation sélectionnée</h2>
      <q-btn color="positive" @click="router.push('/organisations')">OK</q-btn>
    </div>
    <q-table v-else :rows="currentOrganisation.teams" :columns="columns" row-key="_id">
      <template v-slot:top>
        <q-btn color="positive" @click="openAddDialog">Ajouter</q-btn>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn color="warning" @click="selectTeam(props.row)">Modifier</q-btn>
        <q-btn color="negative" @click="openConfirmDialog(props.row)">Supprimer</q-btn>
      </template>
    </q-table>
    <AddTeamDialog ref="addTeamDialogRef" />
    <ConfirmDialog ref="confirmDialogRef" />
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import AddTeamDialog from "@/components/AddTeamDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { useGeneralStore } from "@/store/modules/general";

const router = useRouter();
const generalStore = useGeneralStore();
const addTeamDialogRef = ref(null);
const confirmDialogRef = ref(null);

const currentOrganisation = computed(() => generalStore.CurrentOrganisation);

const columns = [
  { name: "name", label: "Nom", field: "name" },
  { name: "actions", label: "Actions", align: "right" },
];

const openAddDialog = () => {
  addTeamDialogRef.value.displayDialog();
};

const openConfirmDialog = (team) => {
  confirmDialogRef.value.displayDialog(
    "Confirmation",
    `Voulez-vous vraiment supprimer l'équipe : ${team.name}`,
    () => {
      generalStore.removeTeamFromOrganisation({ idTeam: team._id });
    }
  );
};

const selectTeam = async (team) => {
  await generalStore.setCurrentTeam(team);
  await router.push("/team");
};
</script>