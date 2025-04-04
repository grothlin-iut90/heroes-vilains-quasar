<script>
export default {
  name: "TeamsList",
  props: {
    teams: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <q-list>
    <q-item v-for="team in teams" :key="team._id">
      <q-item-section>{{ team.name }}</q-item-section>
    </q-item>
  </q-list>
</template>