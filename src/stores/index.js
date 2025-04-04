import { createPinia } from 'pinia';

import { useAuthStore } from 'src/stores/modules/auth';
import { useGeneralStore } from 'src/stores/modules/general';
import { useErrorStore } from 'src/stores/modules/errors';
import { useOrganisationPasswordStore } from 'src/stores/modules/secret';

const pinia = createPinia();

export default pinia;

export {
  useAuthStore,
  useGeneralStore,
  useErrorStore,
  useOrganisationPasswordStore
};