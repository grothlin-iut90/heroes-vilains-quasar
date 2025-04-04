import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', {
  state: () => ({
    errorMessage: null,
  }),
  
  actions: {
    setErrorMessage(message) {
      this.errorMessage = message;
    },
    
    clearErrorMessage() {
      this.errorMessage = null;
    },
    
    triggerError(message) {
      this.setErrorMessage(message);
    },
    
    clearError() {
      this.clearErrorMessage();
    },
  },
});