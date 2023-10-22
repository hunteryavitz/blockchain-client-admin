<template>
  <div class="meter">
    <h3>Ready: {{ (loading) ? 'loading' : ready }}</h3>
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

const readinessStore = useReadinessStore()
const readinessChart = ref(null)
const ready = ref(false)
const loading = ref(true)

Chart.register(...registerables)

const setReady = () => {
  ready.value = readinessStore.readiness
}

setInterval(async () => {
  await readinessStore.checkReadiness()
  setReady()
}, 10000)

onMounted(async () => {
  await readinessStore.checkReadiness()
  setReady()
  renderChart()
})

const renderChart = () => {
  const canvas = <unknown> readinessChart.value as ChartItem

  if (canvas) {
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: (ready.value) ? ['READY'] : ['NOT READY'],
        datasets: [{
          data: [ready.value ? 1 : 0],
          backgroundColor: [
            'rgba(0, 255, 0, 0.2)',
          ],
          borderColor: [
            'rgba(0, 255, 0, 1)',
          ],
          borderWidth: 1
        },
          {
            data: [ready.value ? 0 : -1],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
          }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
            display: false
          },
          x: {
            stacked: true
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
