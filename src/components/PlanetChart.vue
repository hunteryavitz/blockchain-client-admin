<template>
  <div>
    <canvas ref="planetChart" width="400" height="400"></canvas>
  </div>
</template>

<script setup lang="ts">

import { planetChartData } from "@/planetChartData";
import {Chart, registerables} from 'chart.js';
import type { ChartItem } from 'chart.js';
import { onMounted, ref } from "vue";

Chart.register(...registerables);

const planetChart = ref(null)

onMounted(() => {
  console.log('mounted')
  const canvas = <unknown> planetChart.value as ChartItem
  console.log(canvas)

  if (canvas) {
    console.log('canvas')
    new Chart(canvas, {
      type: "line",
      data: planetChartData.data,
      options: planetChartData.options
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