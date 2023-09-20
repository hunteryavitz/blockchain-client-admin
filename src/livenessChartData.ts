// import { useReadinessStore } from "./stores/readiness";
// import { ref } from "vue";
//
// const readinessStore = useReadinessStore();
// const alive = ref(0.0);
// export const livenessChartData = ref({});  // Use a ref here.
//
// export const getLiveness = async () => {
//     await readinessStore.checkLiveness();
//     alive.value = readinessStore.liveness;
//
//     console.log('from livenessChartData.ts: ' + alive.value)
//
//     // Update the livenessChartData ref after the async operation.
//     livenessChartData.value = {
//         type: "polarArea",
//         data: {
//             labels: ['Liveness', 'Green', 'Yellow', 'Grey', 'Blue'],
//             datasets: [{
//                 label: 'Initial Dataset',
//                 data: [10, 1, 15, 11, 12],
//                 backgroundColor: [
//                     'rgb(255, 99, 132)',
//                     'rgb(75, 192, 192)',
//                     'rgb(255, 205, 86)',
//                     'rgb(201, 203, 207)',
//                     'rgb(54, 162, 235)'
//                 ]
//             }]
//         }
//     };
// };
//
//
// export default {
//     getLiveness,
// };
