<template>
  <div>
    <h1>Health Check</h1>
    <button @click="checkReadiness">Check Readiness</button>
      <p :style="{color: messageColor}" v-if="loading">Loading...</p>
      <p :style="{color: messageColor}" v-else>{{ readinessMessage }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'ReadinessCheck',

  setup() {
    const loading = ref(false);
    const readinessMessage = ref('Awaiting readiness check.');
    const messageColor = ref('white');

    const checkReadiness = async () => {
      loading.value = true;
      messageColor.value = 'white';

      try {
        const response = await fetch('http://localhost:8080/api/v1/readiness');
        const isReady = await response.json(); // This is a boolean.

        if (isReady) {
          readinessMessage.value = 'System is ready.';
          messageColor.value = 'green';
        } else {
          readinessMessage.value = 'System is not ready.';
          messageColor.value = 'red';
        }
      } catch (error) {
        readinessMessage.value = 'Error occurred while fetching readiness status.';
        messageColor.value = 'red';
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      readinessMessage,
      checkReadiness,
      messageColor
    };
  },
};
</script>
