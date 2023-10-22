<template>
  <div>
    <canvas ref="polarChart"></canvas>
  </div>
</template>

<script setup lang="ts">

import { polarChartData } from "@/polarChartData"
import {Chart, registerables} from 'chart.js'
import type { ChartItem } from 'chart.js'

import { onMounted, ref } from "vue"

Chart.register(...registerables)

const polarChart = ref(null)

onMounted(() => {
  console.log('mounted')
  const canvas = <unknown> polarChart.value as ChartItem
  console.log(canvas)

  if (canvas) {
    console.log('canvas')
    new Chart(canvas, {
      type: "polarArea",
      data: polarChartData.data,
      options: polarChartData.options
    })
  }
})
</script>


<style scoped>
  canvas {
    width: 100% !important;
    height: auto !important;
    background-color: #FFFFFF;
    border-radius: 5px;
  }
</style>