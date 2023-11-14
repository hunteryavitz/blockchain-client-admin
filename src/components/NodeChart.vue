<template>
  <div class="meter">
    <h3>Nodes: {{ (loading) ? 'loading' : nodesUp + ' / ' + nodesTotal }}</h3>
    <div>
      <canvas ref="nodeChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useNodeStore } from "@/stores/node"

import { Chart, registerables } from 'chart.js'
import type { ChartItem } from 'chart.js'

import type { NodeData } from "@/types/NodeNetworkHealthTypes";

const nodeStore = useNodeStore()
const nodeChart = ref(null)

const nodesUp = ref(0)
const nodesTotal = ref(0)

const loading = ref(true)

const nodeNetworkHealth = ref({} as NodeData)

Chart.register(...registerables)

const setNodes = () => {
  nodesUp.value = nodeStore.nodesUp
  nodesTotal.value = nodeStore.nodesTotal
}

const setNodeNetworkHealth = () => {
  nodeNetworkHealth.value = nodeStore.nodeNetworkHealthData
}

setInterval(async () => {
  await nodeStore.checkNodes()
  await nodeStore.getNodeNetworkHealth()
  setNodes()
  setNodeNetworkHealth()
}, 10000)

onMounted(async () => {
  await nodeStore.checkNodes()
  await nodeStore.getNodeNetworkHealth()
  setNodes()
  setNodeNetworkHealth()
  renderChart()
})

const renderChart = () => {
  const canvas = <unknown> nodeChart.value as ChartItem

  if (canvas) {
    new Chart(canvas, {
      type: 'scatter',
      data: nodeNetworkHealth.value.data,
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
