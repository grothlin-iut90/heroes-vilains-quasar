<template>
  <q-page>
    <h1>Teams</h1>
    <q-btn color="primary" @click="newTeam" class="mb-4">Ajouter</q-btn>
    <TeamsList :teams="Teams" />
    <NewTeamDialog ref="newTeamDialogRef" />
  </q-page>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import TeamsList from "@/components/TeamsList.vue";
import NewTeamDialog from "@/components/NewTeamDialog.vue";
import { useGeneralStore } from "@/store/modules/general";

const generalStore = useGeneralStore();
const newTeamDialogRef = ref(null);

const Teams = computed(() => generalStore.Teams);

const newTeam = () => {
  newTeamDialogRef.value.displayDialog();
};

onMounted(() => {
  generalStore.getTeams();
});
</script>