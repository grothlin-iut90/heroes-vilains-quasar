import { defineStore } from 'pinia';
import { signIn, getUser, registerUser } from "src/services/auth.service";
import { authUpdateHero } from "src/services/hero.service";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    xsrfToken: null,
    user: null,
  }),

  actions: {
    setAuthentication({ isAuthenticated, xsrfToken }) {
      this.isAuthenticated = isAuthenticated;
      this.xsrfToken = xsrfToken;

      if (xsrfToken) {
        localStorage.setItem("xsrfToken", xsrfToken);
      } else {
        localStorage.removeItem("xsrfToken");
      }
    },

    setUser(user) {
      this.user = user;
    },

    async login({ login, password }) {
      const result = await signIn(login, password);
      if (result.error === 0) {
        this.setAuthentication({ isAuthenticated: true, xsrfToken: result.data.xsrfToken });
        return true;
      } else {
        this.setAuthentication({ isAuthenticated: false, xsrfToken: null });
        return false;
      }
    },

    async fetchUser(login) {
      const result = await getUser(login);
      if (result.error === 0) {
        this.setUser(result.data);
      } else {
        this.setUser(null);
      }
    },

    async updateHero(hero) {
      if (!this.isAuthenticated) {
        console.log("User is not authenticated.");
        return false;
      }
      try {
        const result = await authUpdateHero(hero);
        if (result.error === 0) {
          console.log("Hero updated successfully:", result.data);
          return true;
        } else {
          console.log("Error updating hero:", result.data);
          return false;
        }
      } catch (err) {
        console.log("Error in updateHero:", err);
        return false;
      }
    },

    async registerUser({ login, password, hero, captchaToken }) {
      const result = await registerUser(login, password, hero, captchaToken);
      return result;
    },

    logout() {
      this.setAuthentication({ isAuthenticated: false, xsrfToken: null });
      this.setUser(null);
    },
  },
});