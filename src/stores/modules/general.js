import { defineStore } from "pinia";
import {
  createOrganisation,
  getAllOrganisationNames,
  getOrganisationByID,
  addTeam,
  removeTeam,
} from "src/services/org.service";
import {
  getAliases,
  getHeroByID,
  createHero,
  updateHero,
} from "src/services/hero.service";
import {
  getAllTeams,
  createTeam,
  addHeroes,
  removeHeroes,
} from "src/services/team.service";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    HeroAliases: [],
    CurrentHero: null,
    Teams: [],
    CurrentTeam: null,
    OrganisationNames: [],
    CurrentOrganisation: null,
    OrganisationPassword: "",
    HeroPowerTypes: [
      { label: "Force", value: 1 },
      { label: "Vitesse", value: 2 },
      { label: "Endurance", value: 3 },
      { label: "Magie", value: 4 },
      { label: "Effrayant", value: 5 },
      { label: "Furtivité", value: 6 },
      { label: "Stupidité", value: 7 },
    ],

  }),
  actions: {
    setOrganisationPassword(password) {
      this.OrganisationPassword = password;
    },
    async getHeroAliases() {
      console.log("STORE: Get all hero aliases")
      try {
        let result = await getAliases()
        if (result.error === 0) {
          console.log("Fetched hero aliases:", result.data)
          this.HeroAliases = result.data
          return result.data
        } else {
          console.log(result.data)
        }
      } catch (err) {
        console.error("Error in getHeroAliases()", err)
      }
    },
    async getHero(heroId) {
      console.log("STORE: Get hero by id");
      try {
        let result = await getHeroByID(heroId);
        if (result.error === 0) {
          this.CurrentHero = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans getHero() : " + err);
      }
    },
    async getTeams() {
      console.log("STORE: Get all teams");
      try {
        let result = await getAllTeams();
        if (result.error === 0) {
          this.Teams = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans getTeams()", err);
      }
    },
    async getOrganisations() {
      console.log("STORE: Get all organisation names");
      try {
        let result = await getAllOrganisationNames();
        console.log('result.data: ',result.data)
        if (result.error === 0) {
          this.OrganisationNames = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans getOrganisations()", err);
      }
    },
    async getOrganisation(data) {
      console.log("STORE: Get organisation by id");
      try {
        let result = await getOrganisationByID(data.id, data.secret);
        if (result.error === 0) {
          this.CurrentOrganisation = result.data[0];
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans getOrganisation()", err);
      }
    },
    async newOrganisation(data) {
      console.log("STORE: Create new organisation");
      let name = data.name;
      let secret = data.password;
      try {
        let result = await createOrganisation(name, secret);
        if (result.error === 0) {
          this.OrganisationNames.push(result.data);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans newOrganisation()", err);
      }
    },
    async addTeamToOrganisation(data) {
      console.log("STORE: Add new team");
      let idTeam = data.idTeam;
      let name = data.nameTeam;
      try {
        let result = await addTeam(idTeam, this.OrganisationPassword);
        if (result.error === 0) {
          let team = result.data.teams.find((t) => t._id === idTeam);
          team.name = name;
          this.CurrentOrganisation.teams.push(team);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans addTeamToOrganisation(): " + err);
      }
    },
    async removeTeamFromOrganisation(data) {
      console.log("STORE: Remove team");
      let idTeam = data.idTeam;
      try {
        let result = await removeTeam(idTeam, this.OrganisationPassword);
        if (result.error === 0) {
          this.CurrentOrganisation = result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans removeTeamFromOrganisation(): " + err);
      }
    },
    async setCurrentTeam(team) {
      console.log("Original team members:", team.members)
      let current = JSON.parse(JSON.stringify(team))
      try {
        const updatedMembers = await Promise.all(
          team.members.map(async (heroId) => {
            console.log(`Fetching hero with ID: ${heroId}`)
            const result = await getHeroByID(heroId)
            if (result.error === 0) {
              console.log(`Fetched hero data for ID ${heroId}:`, result.data[0])
              return result.data[0]
            } else {
              console.log(`Error fetching hero with ID ${heroId}:`, result.data)
              return null
            }
          })
        )
        current.members = updatedMembers.filter((member) => member !== null)
        console.log("Updated team members with hero data:", current.members)
        this.CurrentTeam = current
      } catch (err) {
        console.error("Error in setCurrentTeam:", err)
      }
    },
    async createTeam(data) {
      console.log("STORE: Create new team");
      let name = data.name;
      try {
        let result = await createTeam(name);
        if (result.error === 0) {
          this.Teams.push(result.data);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans createTeam()", err);
      }
    },
    async addHeroesToTeam(data) {
      console.log("STORE: Add heroes to team")
      let idTeam = data.idTeam
      let heroes = data.heroes
      try {
        let result = await addHeroes(idTeam, heroes)
        if (result.error === 0) {
          await this.setCurrentTeam(result.data) // Ensure this is awaited
        } else {
          console.log(result.data)
        }
      } catch (err) {
        console.error("Cas anormal dans addHeroesToTeam()", err)
      }
    },
    async removeHeroesFromTeam(data) {
      console.log("STORE: Remove heroes from team");
      let idTeam = data.idTeam;
      let heroes = data.heroes;
      try {
        let result = await removeHeroes(idTeam, heroes);
        if (result.error === 0) {
          await this.setCurrentTeam(result.data);
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans removeHeroesFromTeam()", err);
      }
    },
    async createHero(hero) {
      try {
        console.log("STORE: Create new hero");
        console.log("Hero data:", hero);
        let result = await createHero(hero);
        console.log("Result of createHero:", result);
        if (result.error === 0) {
          await this.getHeroAliases();
          return result.data;
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.error("Cas anormal dans createHero()", err);
      }
    },
    async updateHero(hero) {
      try {
        let result = await updateHero(hero, this.OrganisationPassword);
        if (result.error === 0) {
          if (this.CurrentTeam) {
            // Ensure the team is updated with the latest data
            const updatedTeam = this.CurrentOrganisation.teams.find(
              (t) => t._id === this.CurrentTeam._id
            );

            // Check if the updated hero exists in the team
            const heroIndex = updatedTeam.members.findIndex(
              (member) => member._id === hero._id
            );

            if (heroIndex !== -1) {
              // Update the hero in the team directly
              updatedTeam.members[heroIndex] = { ...updatedTeam.members[heroIndex], ...hero };
            }

            await this.setCurrentTeam(updatedTeam);
          }
          await this.getHeroAliases();
        } else {
          console.log(result.data);
        }
      } catch (err) {
        console.log("Cas anormal dans updateHero()", err);
      }
    },
  },
});