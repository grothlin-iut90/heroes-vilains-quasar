<script setup>
import { defineProps } from 'vue'

// Define the prop
defineProps({
  teams: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <q-page class="q-pa-md">
    <div class="team-grid">
      <div v-for="(team, index) in teams" :key="index" class="team-item">
        <q-card class="q-pa-md" bordered>
          <q-card-section>
            <div class="text-h6">{{ team.name }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="primary" label="Voir" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style>
.team-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; /* Space between items */
}

.team-item {
  flex: 1 1 calc(25% - 16px); /* 4 items per row with spacing */
  max-width: calc(25% - 16px); /* Ensure items don't exceed 25% width */
  box-sizing: border-box; /* Include padding and border in width calculation */
}

@media (max-width: 1024px) {
  .team-item {
    flex: 1 1 calc(33.33% - 16px); /* 3 items per row on medium screens */
    max-width: calc(33.33% - 16px);
  }
}

@media (max-width: 768px) {
  .team-item {
    flex: 1 1 calc(50% - 16px); /* 2 items per row on small screens */
    max-width: calc(50% - 16px);
  }
}

@media (max-width: 480px) {
  .team-item {
    flex: 1 1 100%; /* 1 item per row on very small screens */
    max-width: 100%;
  }
}
</style>