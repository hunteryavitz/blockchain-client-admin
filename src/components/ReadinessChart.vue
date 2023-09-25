<template>
  <div class="meter">
    <h3>ready: {{ ready }}</h3>
    <div>
      <canvas ref="readinessChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import type { ChartItem } from 'chart.js'

import { onMounted, ref } from "vue";
import { useReadinessStore } from "@/stores/readiness"

Chart.register(...registerables)

const readinessChart = ref(null)

const readinessStore = useReadinessStore()
const ready = ref(false)

const setReady = () => {
  ready.value = readinessStore.readiness
}

const setReadinessChartData = () => {
  // readinessChartData.value.data.datasets[0].data[0] = ready.value
}

onMounted(async () => {
  // await useLivenessStore().checkReadiness()
  // setReady()
  await useReadinessStore().checkReadiness()
  setReady()
  // await getLiveness()
  // setLivenessChartData()
  renderChart()
})

setInterval(async () => {
  // setReady()
  await readinessStore.checkReadiness()
  setReady()
  // renderChart()
  // myChart.update()
  // setLivenessChartData()
}, 5000)

const renderChart = () => {
  const canvas = <unknown> readinessChart.value as ChartItem

  if (canvas) {

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ['1', '2', '3'],
        datasets: [{
          label: 'READY',
          data: [0, 1, ready.value ? 1 : 0],
          backgroundColor: [
            // 'rgba(255, 99, 132, 0.2)',
            'rgba(0, 255, 0, 0.2)',
            // 'rgba(0, 0, 255, 0.2)',
          ],
          borderColor: [
            // 'rgba(255, 99, 132, 1)',
            'rgba(0, 255, 0, 1)',
            // 'rgba(0, 0, 255, 1)',
          ],
          borderWidth: 1
        },
          {
            label: 'NOT READY',
            data: [-1, 0, ready.value ? 0 : -1],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              // 'rgba(0, 255, 0, 0.2)',
              // 'rgba(0, 0, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              // 'rgba(255, 255, 255, 1)',
              // 'rgba(0, 0, 255, 1)',
            ],
            borderWidth: 1
          }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stacked: true
          },
          x: {
            stacked: true
          }
        }
      }
    })
    // chart.update()
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
