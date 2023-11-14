import { defineStore } from "pinia"
import { ref } from "vue"
import { HTTP } from "@/api/http-commons"
import type {
    DataGroup,
    NodeData,
    NodeNetworkHealthResponse
} from "@/types/NodeNetworkHealthTypes";

export const useNodeStore = defineStore('node', () => {
    const nodesUp = ref(0)
    const nodesTotal = ref(0)

    const nodeNetworkHealth = ref({} as NodeNetworkHealthResponse)
    const nodeNetworkActive = ref({} as DataGroup)
    const nodeNetworkInactive = ref({} as DataGroup)
    const nodeNetworkHealthData = ref({} as NodeData)

    async function checkNodes() {
        try {
            await HTTP.get("/nodes")
                .then((response) => {
                    console.log(response)
                    nodesUp.value = 5
                    nodesTotal.value = 10
                })
                .catch((error: any) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function getNodeNetworkHealth() {
        try {
            await HTTP.get("/nodeManager/getNodeNetworkHealth")
                .then((response) => {
                    nodeNetworkHealth.value = response.data
                    const nodeNetActive =
                        nodeNetworkHealth.value.nodeHealthResponse
                            .filter(node => node.nodeStatus === 'ACTIVE')
                            .map(node => {
                                return {
                                    x: node.nodeId,
                                    y: node.nodeTraffic
                                }
                            });
                    nodeNetworkActive.value['label'] = 'Active'
                    const nodeNetInactive =
                        nodeNetworkHealth.value.nodeHealthResponse
                            .filter(node => node.nodeStatus === 'INACTIVE')
                            .map(node => {
                                return {
                                    x: node.nodeId,
                                    y: node.nodeTraffic
                                }
                            });
                    nodeNetworkInactive.value['label'] = 'Inactive'
                    nodeNetworkHealthData.value = {
                        data: {
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)'
                            ],
                            datasets: [
                                {
                                    label: nodeNetworkActive.value['label'],
                                    data: nodeNetActive,
                                },
                                {
                                    label: nodeNetworkInactive.value['label'],
                                    data: nodeNetInactive,
                                }
                            ]
                        }
                    }
                })
                .catch((error: any) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        nodesUp,
        nodesTotal,
        checkNodes,
        getNodeNetworkHealth,
        nodeNetworkHealthData,
    }
})
