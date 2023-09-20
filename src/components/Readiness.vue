<template>
  <div>
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
  setLivenessChartData()


  console.log(canvas)

})

const renderChart = () => {
  const canvas = <unknown> livenessChart.value as ChartItem

  if (canvas) {
    console.log('canvas')
    new Chart(canvas, {
      type: "polarArea",
      data: {
        labels: ['Liveness', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [{
          label: 'Initial Dataset',
          data: [alive.value, 44, 35, 19, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(201, 203, 207)',
            'rgb(54, 162, 235)'
          ],
        }]
      }
    })
  }
}

setInterval(async () => {
  // setReady()
  await readinessStore.checkLiveness()
  setAlive()
  renderChart()
  console.log('setInterval')
  // setLivenessChartData()
}, 1000)
</script>


<style scoped>
canvas {
  width: 100% !important;
  height: auto !important;
  background-color: #FFFFFF;
  border-radius: 5px;
}

</style>