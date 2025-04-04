<template>
  <div class="TeamView">
    <h1>Équipe</h1>
    <div v-if="!CurrentTeam">
      <h2>Aucune équipe sélectionnée</h2>
      <q-btn color="positive" @click="router.push('/organisations')">OK</q-btn>
    </div>
    <q-table v-else :rows="CurrentTeam.members" :columns="columns" row-key="_id">
      <template v-slot:top>
        <q-btn color="positive" @click="openAddDialog">Ajouter</q-btn>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-btn color="warning" @click="selectHero(props.row)">Modifier</q-btn>
        <q-btn color="negative" @click="removeHero(props.row)">Supprimer</q-btn>
      </template>
    </q-table>
    <AddHeroDialog ref="addHeroDialogRef" />
    <EditHeroDialog :hero="selectedHero" ref="editHeroDialogRef" @valid="update" />
    <ConfirmDialog ref="confirmDialogRef" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useGeneralStore } from "@/store/modules/general";
import AddHeroDialog from "@/components/AddHeroDialog.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import EditHeroDialog from "@/components/EditHeroDialog.vue";

const router = useRouter();
const generalStore = useGeneralStore();

const selectedHero = ref({ publicName: "", realName: "", powers: [] });
const addHeroDialogRef = ref(null);
const editHeroDialogRef = ref(null);
const confirmDialogRef = ref(null);

const CurrentTeam = computed(() => generalStore.CurrentTeam);

const columns = [
  { name: "publicName", label: "Nom public", field: "publicName" },
  { name: "realName", label: "Nom réel", field: "realName" },
  { name: "actions", label: "Actions", align: "right" },
];

const openAddDialog = () => {
  addHeroDialogRef.value.displayDialog();
};

const removeHero = async (hero) => {
  confirmDialogRef.value.displayDialog(
    "Suppression",
    `Voulez-vous vraiment enlever de l'équipe le héros ${hero.publicName}`,
    () => {
      generalStore.removeHeroesFromTeam({ idTeam: CurrentTeam.value._id, heroes: [hero._id] });
    }
  );
};

const selectHero = (hero) => {
  selectedHero.value = hero;
  editHeroDialogRef.value.displayDialog();
};

const update = async (hero) => {
  hero._id = selectedHero.value._id;
  await generalStore.updateHero(hero);
};
</script>