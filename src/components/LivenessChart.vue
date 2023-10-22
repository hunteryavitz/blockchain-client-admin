<template>
  <div class="meter">
    <h3>Live: {{ (loading) ? 'loading' : alive }}</h3>
    <div>
      <canvas ref="livenessChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import type { ChartItem } from 'chart.js'
import { onMounted, ref } from "vue";
import { useLivenessStore } from "@/stores/liveness"

const livenessStore = useLivenessStore()
const livenessChart = ref(null)
const alive = ref(0.0)
const loading = ref(true)

Chart.register(...registerables)

const setAlive = () => {
  alive.value = livenessStore.liveness
}

setInterval(async () => {
  await livenessStore.checkLiveness()
  setAlive()
}, 10000)

onMounted(async () => {
  await livenessStore.checkLiveness()
  setAlive()
  renderChart()
})

const renderChart = () => {
  const canvas = <unknown> livenessChart.value as ChartItem

  if (canvas) {
      new Chart(canvas, {
      type: "polarArea",
      data: {
        labels: ['Liveness', 'Request', 'Response', 'Network', 'Latency'],
        datasets: [{
          label: 'Initial Dataset',
          data: [alive.value, 76, 44, 80, 14],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ],
          borderColor: [
            'rgb(50, 50, 50)',
            'rgb(50, 50, 50)',
            'rgb(50, 50, 50)',
            'rgb(50, 50, 50)',
            'rgb(50, 50, 50)'
          ],
        }]
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
