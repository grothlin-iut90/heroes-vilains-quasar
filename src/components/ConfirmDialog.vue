<script>
import { ref } from "vue";

export default {
  name: "ConfirmDialog",
  setup() {
    const dialog = ref(false);
    const title = ref("");
    const message = ref("");
    const onConfirm = ref(() => {});

    const confirm = () => {
      onConfirm.value();
      dialog.value = false;
    };

    const displayDialog = (dialogTitle, dialogMessage, confirmCallback) => {
      dialog.value = true;
      title.value = dialogTitle;
      message.value = dialogMessage;
      onConfirm.value = confirmCallback;
    };

    return {
      dialog,
      title,
      message,
      onConfirm,
      confirm,
      displayDialog,
    };
  },
};
</script>

<template>
  <div class="ConfirmDialog">
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>
        <q-card-section>{{ message }}</q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" @click="dialog = false" />
          <q-btn flat label="Continuer" color="primary" @click="confirm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
