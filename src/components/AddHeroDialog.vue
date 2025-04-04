<script>
import { ref, computed, onMounted } from "vue";
import { useGeneralStore } from '@/store/modules/general';
import EditHero from "@/components/EditHero.vue";

export default {
  name: "AddHeroDialog",
  components: { EditHero },
  setup() {
    const generalStore = useGeneralStore();
    const dialog = ref(false);
    const selectedHero = ref(null);
    const tab = ref(0);
    const emptyHero = ref({ publicName: "", realName: "", powers: [] });

    const heroAliases = computed(() => generalStore.state.general.HeroAliases);
    const currentTeam = computed(() => generalStore.state.general.CurrentTeam);

    const sortedHeroes = computed(() =>
      heroAliases.value
        .filter(
          (obj1) =>
            !currentTeam.value.members.some((obj2) => obj1._id === obj2._id)
        )
        .sort((a, b) => a.publicName > b.publicName)
    );

    const isValidForm = computed(() => selectedHero.value !== null);

    const displayDialog = () => {
      dialog.value = true;
    };

    const createNewHero = async (hero) => {
      dialog.value = false;
      const creation = await generalStore.dispatch("general/createHero", hero);
      const id = creation._id;
      const data = {
        idTeam: currentTeam.value._id,
        heroes: [id],
      };
      await generalStore.dispatch("general/addHeroesToTeam", data);
    };

    const recruitHero = async () => {
      dialog.value = false;
      const data = {
        idTeam: currentTeam.value._id,
        heroes: [selectedHero.value._id],
      };
      await generalStore.dispatch("general/addHeroesToTeam", data);
      selectedHero.value = null;
    };

    onMounted(() => {
      generalStore.dispatch("general/getHeroAliases");
    });

    return {
      dialog,
      selectedHero,
      tab,
      emptyHero,
      sortedHeroes,
      isValidForm,
      displayDialog,
      createNewHero,
      recruitHero,
    };
  },
};
</script>

<template>
  <div class="add-hero-dialog">
    <q-dialog v-model="dialog">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="0">
          <q-card>
            <q-card-section>
              <div class="text-h6">Recruter un héro</div>
            </q-card-section>
            <q-card-section>
              <q-virtual-scroll :items="sortedHeroes" scroll-target="self">
                <template v-slot="{ item }">
                  <q-item>
                    <q-checkbox v-model="selectedHero" :label="item.publicName" :val="item" />
                  </q-item>
                </template>
              </q-virtual-scroll>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Annuler" color="negative" @click="dialog = false" />
              <q-btn flat label="Valider" color="positive" :disable="!isValidForm" @click="recruitHero" />
            </q-card-actions>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="1">
          <EditHero :hero="emptyHero" @cancel="dialog = false" @valid="createNewHero" />
        </q-tab-panel>
      </q-tab-panels>
    </q-dialog>
  </div>
</template>

<style scoped></style>