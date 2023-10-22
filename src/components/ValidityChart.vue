<template>
  <div class="meter">
    <h3>Valid: {{ (loading) ? 'loading' : valid }}</h3>
    <div>
      <canvas ref="validityChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import type { ChartItem } from 'chart.js'
import { onMounted, ref } from "vue";
import { useValidityStore } from "@/stores/validity"

const validityStore = useValidityStore()
const validityChart = ref(null)
const valid = ref(false)
const loading = ref(true)

Chart.register(...registerables)

const setValid = () => {
  valid.value = validityStore.validity
}

setInterval(async () => {
  await validityStore.checkValidity()
  setValid()
}, 10000)

onMounted(async () => {
  await validityStore.checkValidity()
  setValid()
  renderChart()
})

const renderChart = () => {
  const canvas = <unknown> validityChart.value as ChartItem

  if (canvas) {
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: (valid.value) ? ['VALID'] : ['NOT VALID'],
        datasets: [{
          data: [valid.value ? 1 : 0],
          backgroundColor: [
            'rgba(0, 255, 0, 0.2)',
          ],
          borderColor: [
            'rgba(0, 255, 0, 1)',
          ],
          borderWidth: 1
        },
          {
            data: [valid.value ? 0 : -1],
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
