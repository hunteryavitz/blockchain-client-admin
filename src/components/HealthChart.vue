<template>
  <div class="meter">
    <h3>healthy: {{ healthy }}</h3>
    <div>
      <canvas ref="healthChart"></canvas>
    </div>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useHealthStore } from "@/stores/health";
import { Chart, registerables } from "chart.js";
import type { ChartItem } from "chart.js";

Chart.register(...registerables)

const healthChart = ref(null)

const healthStore = useHealthStore()
const healthy = ref([0.0, 0.0, 0.0, 0.0, 0.0])

const setHealth = () => {
  healthy.value = healthStore.health
}

const setHealthChartData = () => {
  // healthChartData.value.data.datasets[0].data[0] = healthy.value
}

onMounted(async () => {
  // await useHealthStore().checkReadiness()
  // setReady()
  await healthStore.checkHealth()
  setHealth()
  // await getHealth()
  // setHealthChartData()
  renderChart()
})

setInterval(async () => {
  // setReady()
  await healthStore.checkHealth()
  setHealth()
  // renderChart()
  // myChart.update()
  // setHealthChartData()
}, 5000)

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
