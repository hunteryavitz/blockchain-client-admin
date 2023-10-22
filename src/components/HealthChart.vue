<template>
  <div class="meter">
    <h3>healthy: {{ (loading) ? 'loading' : healthAverage }}</h3>
    <div>
      <canvas ref="healthChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from "chart.js";
import type { ChartItem } from "chart.js";
import { onMounted, ref } from "vue";
import { useHealthStore } from "@/stores/health";

const healthStore = useHealthStore()
const healthChart = ref(null)
const healthy = ref([0.0, 0.0, 0.0, 0.0, 0.0])
const healthAverage = ref(0.0)
const loading = ref(true)

Chart.register(...registerables)

const setHealth = () => {
  healthy.value = healthStore.health
  healthAverage.value = healthStore.average
}

setInterval(async () => {
  await healthStore.checkHealth()
  setHealth()
}, 10000)

onMounted(async () => {
  await healthStore.checkHealth()
  setHealth()
  renderChart()
})

const renderChart = () => {
  const canvas = <unknown> healthChart.value as ChartItem

  if (canvas) {
      new Chart(canvas, {
      type: "radar",
      data: {
        labels: ['Info', 'Warning', 'Error', 'Critical', 'Unknown'],
        datasets: [{
          label: 'Health',
          data: [healthy.value[0], healthy.value[1], healthy.value[2], healthy.value[3], healthy.value[4]],
          backgroundColor: [
            'rgba(130, 130, 255, 0.2)'
          ],
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    })
  }
  loading.value = false
}
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: auto !important;
  background-color: #000;
  border-radius: 5px;
}
.meter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
}
</style>
