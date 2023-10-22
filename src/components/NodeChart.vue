<template>
  <div class="meter">
    <h3>Nodes: {{ (loading) ? 'loading' : nodesUp + ' / ' + nodesTotal }}</h3>
    <div>
      <canvas ref="nodeChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import type { ChartItem } from 'chart.js'
import { onMounted, ref } from "vue";
import { useNodeStore } from "@/stores/node"

const nodeStore = useNodeStore()
const nodeChart = ref(null)
const nodesUp = ref(0)
const nodesTotal = ref(0)
const loading = ref(true)

Chart.register(...registerables)

const setNodes = () => {
  nodesUp.value = nodeStore.nodesUp
  nodesTotal.value = nodeStore.nodesTotal
}

setInterval(async () => {
  await nodeStore.checkNodes()
  setNodes()
}, 10000)

onMounted(async () => {
  await nodeStore.checkNodes()
  setNodes()
  renderChart()
})

const renderChart = () => {
  const canvas = <unknown> nodeChart.value as ChartItem

  if (canvas) {
    const data = {
      datasets: [{
        label: 'Nodes',
        data: [
          {x: 1, y: 3},
          {x: 2, y: 10},
          {x: 3, y: 5},
          {x: 4, y: 3},
          {x: 5, y: 1},
          {x: 6, y: 8},
          {x: 7, y: 4},
          {x: 8, y: 12}
        ],
        backgroundColor: 'rgb(255, 255, 0)'
      }],
    }
    new Chart(canvas, {
      type: 'scatter',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Scatter Chart'
          }
        }
      },
    });
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
