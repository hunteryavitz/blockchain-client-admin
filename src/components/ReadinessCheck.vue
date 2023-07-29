<template>
  <div>
    <button @click="checkReadiness">Check Readiness</button>
    <p v-if="loading">Loading...</p>
    <p v-else>{{ readinessMessage }}</p>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'ReadinessCheck',

  setup() {
    const loading = ref(false);
    const readinessMessage = ref('');

    const checkReadiness = async () => {
      loading.value = true;

      try {
        const response = await fetch('http://localhost:8080/api/v1/readiness');
        const isReady = await response.json(); // This is a boolean.

        if (isReady) {
          readinessMessage.value = 'System is ready.';
        } else {
          readinessMessage.value = 'System is not ready.';
        }
      } catch (error) {
        readinessMessage.value = 'Error occurred while fetching readiness status.';
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      readinessMessage,
      checkReadiness,
    };
  },
};
</script>
