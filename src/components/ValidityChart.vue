<template>
  <div class="meter">
    <h3>valid: {{ valid }}</h3>
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

Chart.register(...registerables)

const validityChart = ref(null)
const validityStore = useValidityStore()
const valid = ref(false)

const setValid = () => {
  valid.value = validityStore.validity
}

const setValidityChartData = () => {
  // validityChart.value.data.datasets[0].data[0] = alive.value
}

onMounted(async () => {
  await validityStore.checkValidity()
  setValid()
  renderChart()
  // setValidityChartData()
})

const renderChart = () => {
  const canvas = <unknown> validityChart.value as ChartItem

  if (canvas) {
    console.log('canvas')

    new Chart(canvas, {
      type: "bar",
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
          label: 'VALID',
          data: [valid.value ? 1 : 0, 0, 1, 1, 1, 1, 1],
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
            label: 'INVALID',
            data: [valid.value ? 0 : -1, -1, 0, 0, 0, 0, 0],
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

setInterval(async () => {
  // setReady()
  await validityStore.checkValidity()
  setValid()
  // renderChart()
  console.log('setInterval')
  // setLivenessChartData()
}, 5000)
</script>

<style scoped>
.meter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
}
</style>