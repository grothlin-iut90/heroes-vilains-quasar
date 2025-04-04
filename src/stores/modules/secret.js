import { defineStore } from 'pinia';

export const useSecretStore = defineStore('organisationPassword', {
  state: () => ({
    OrganisationPassword: "",
  }),

  actions: {
    setOrganisationPassword(password) {
      this.OrganisationPassword = password;
    },
  },
});