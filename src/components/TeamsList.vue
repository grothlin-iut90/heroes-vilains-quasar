<script setup>
import { defineProps } from 'vue'
// import { useRouter } from 'vue-router';

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
        <q-card-actions align="left">
          <q-btn class="button-team">{{ team.name }}</q-btn>
        </q-card-actions>
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

.button-team {
  width: 100%; /* Full width of the card */
  text-align: left; /* Align text to the left */
  padding: 16px; /* Padding inside the button */
  background-color: #f0f0f0; /* Light background color */
  border-radius: 4px; /* Rounded corners */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.team-item {
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
