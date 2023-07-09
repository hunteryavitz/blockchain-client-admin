<script setup lang="ts">
  import {ref} from "vue";

  const count = ref(0)

  const increment = () => {
    count.value++
  }
</script>

<template>
  <div class="counter">
    <h1>Counter</h1>
    <p>This is the counter page for the blockchain admin panel.</p>
    <button @click="increment">Increment</button>
    <p>Count: {{ count }}</p>
  </div>
</template>

<style scoped>

</style>
