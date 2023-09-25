<template>
  <div class="meter">
    <h3>nodes: {{nodesUp}} / {{nodesTotal}}</h3>
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

Chart.register(...registerables)

const nodeChart = ref(null)

const nodeStore = useNodeStore()
const nodesUp = ref(0)
const nodesTotal = ref(0)

const setNodes = () => {
  nodesUp.value = nodeStore.nodesUp
  nodesTotal.value = nodeStore.nodesTotal
}

const setNodeChartData = () => {
  // nodeChartData.value.data.datasets[0].data[0] = nodesUp.value
}

onMounted(async () => {
  await nodeStore.checkNodes()
  setNodes()
  renderChart()
})

setInterval(async () => {
  await nodeStore.checkNodes()
  setNodes()
}, 5000)

const renderChart = () => {
  const canvas = <unknown> nodeChart.value as ChartItem

  if (canvas) {

    const data = {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }, {
          x: -7,
          y: 3
        }, {
          x: 1,
          y: 1
        }, {
          x: -2,
          y: 8
        }, {
          x: 6,
          y: 4
        }, {
          x: 0.5,
          y: 5.5
        }],
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
