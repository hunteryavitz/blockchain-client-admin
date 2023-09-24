<template>
  <div class="meter">
    <h3>ready: {{ ready }}</h3>
    <h3>live: {{ alive }}</h3>
    <div>
      <canvas ref="livenessChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">

// import {getLiveness, livenessChartData} from "@/livenessChartData"
import { Chart, registerables } from 'chart.js'
import type { ChartItem } from 'chart.js'

import { onMounted, ref } from "vue";
import { useReadinessStore } from "@/stores/readiness"

Chart.register(...registerables)

const livenessChart = ref(null)

const readinessStore = useReadinessStore()
const ready = ref(false)
const alive = ref(0.0)

const setReady = () => {
  ready.value = readinessStore.readiness
}

const setAlive = () => {
  alive.value = readinessStore.liveness
}

const setLivenessChartData = () => {
  // livenessChartData.value.data.datasets[0].data[0] = alive.value
}

onMounted(async () => {
  await useReadinessStore().checkReadiness()
  setReady()
  await useReadinessStore().checkLiveness()
  setAlive()
  // await getLiveness()
  // setLivenessChartData()
  renderChart()
})

const renderChart = () => {
  const canvas = <unknown> livenessChart.value as ChartItem
  let myChart: any
  if (canvas) {
    myChart = new Chart(canvas, {
      type: "polarArea",
      data: {
        labels: ['Liveness', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [{
          label: 'Initial Dataset',
          data: [alive.value, 44, 35, 19, Math.random() * 100],
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

  setInterval(async () => {
    // setReady()
    await readinessStore.checkLiveness()
    setAlive()
    // renderChart()
    // myChart.update()
    console.log('setInterval')
    // setLivenessChartData()
  }, 5000)

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