<template>
  <div class="meter">
    <h3>live: {{ alive }}</h3>
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

Chart.register(...registerables)

const livenessChart = ref(null)

const livenessStore = useLivenessStore()
const alive = ref(0.0)

const setAlive = () => {
  alive.value = livenessStore.liveness
}

const setLivenessChartData = () => {
  // livenessChartData.value.data.datasets[0].data[0] = alive.value
}

onMounted(async () => {
  // await useLivenessStore().checkReadiness()
  // setReady()
  await livenessStore.checkLiveness()
  setAlive()
  // await getLiveness()
  // setLivenessChartData()
  renderChart()
})

setInterval(async () => {
  // setReady()
  await livenessStore.checkLiveness()
  setAlive()
  // renderChart()
  // myChart.update()
  // setLivenessChartData()
}, 5000)

const renderChart = () => {
  const canvas = <unknown> livenessChart.value as ChartItem

  if (canvas) {

      new Chart(canvas, {
      type: "polarArea",
      data: {
        labels: ['Liveness', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [{
          label: 'Initial Dataset',
          data: [alive.value, 22, 44, 66, 88],
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
