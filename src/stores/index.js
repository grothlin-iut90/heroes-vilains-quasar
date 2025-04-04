import { createPinia } from 'pinia';

import { useAuthStore } from 'src/stores/modules/auth';
import { useGeneralStore } from 'src/stores/modules/general';
import { useErrorStore } from 'src/stores/modules/errors';
import { useSecretStore } from 'src/stores/modules/secret';

const pinia = createPinia();

export default pinia;

export {
  useAuthStore,
  useGeneralStore,
  useErrorStore,
  useSecretStore
};