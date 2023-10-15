<template>
  <div class="meter">
    <h3>production: very good</h3>
    <div>
      <canvas ref="productionChart"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Chart, registerables} from "chart.js";
import type { ChartItem } from "chart.js";
import { onMounted, ref } from "vue";
import { useProductionStore } from "@/stores/production";

Chart.register(...registerables);

const productionChart = ref(null)

const productionStore = useProductionStore()

// const data1 = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
// const data2 = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const production = ref({
  data: {
    dataset1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dataset2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
})

const data = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  datasets: [
    {
      label: "Transactions",
      data: production.value.data.dataset1,
      backgroundColor: "rgba(54,73,93,.5)",
      borderColor: "#36495d",
      borderWidth: 3,
      tension: 1
    },
    {
      label: "Blockchain",
      data: production.value.data.dataset2,
      backgroundColor: "rgba(71, 183,132,.5)",
      borderColor: "#47b784",
      borderWidth: 3,
      tension: 1
    }
  ]
}

const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        padding: 25,
      }
    }
  }
}

const setProductionData = () => {
  production.value.data = productionStore.productionPayload.data
  data.datasets[0].data = production.value.data.dataset1
  data.datasets[1].data = production.value.data.dataset2
  // data1.value = productionStore.data1
  // data2.value = productionStore.data2
}

onMounted(async () => {
  await productionStore.getProduction()
  setProductionData()
  renderChart()
})

setInterval(async () => {
  await productionStore.getProduction()
  setProductionData()
  // renderChart()
}, 5000)

const renderChart = () => {
  const canvas = <unknown> productionChart.value as ChartItem

  if (canvas) {
    new Chart(canvas, {
      type: "line",
      data: data,
      options: options
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
