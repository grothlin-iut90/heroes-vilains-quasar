<script>
export default {
  name: "OrganisationsList",
  props: {
    organisationNames: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <q-list>
    <q-item v-for="organisation in organisationNames" :key="organisation._id">
      <q-item-section>{{ organisation.name }}</q-item-section>
    </q-item>
  </q-list>
</template>