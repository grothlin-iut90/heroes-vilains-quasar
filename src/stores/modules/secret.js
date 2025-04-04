import { defineStore } from 'pinia';

export const useOrganisationPasswordStore = defineStore('organisationPassword', {
  state: () => ({
    OrganisationPassword: "",
  }),
  
  actions: {
    setOrganisationPassword(password) {
      this.OrganisationPassword = password;
    },
  },
});