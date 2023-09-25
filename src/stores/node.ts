import { defineStore } from "pinia"
import { ref } from "vue"
import { HTTP } from "@/api/http-commons"

export const useNodeStore = defineStore('node', () => {
    const nodesUp = ref(0)
    const nodesTotal = ref(0)

    async function checkNodes() {
        try {
            await HTTP.get("/nodes")
                .then((response) => {
                    // nodesUp.value = response.data.nodesUp
                    // nodesTotal.value = response.data.nodesTotal
                    nodesUp.value = 131
                    nodesTotal.value = 157
                })
                .catch((error: any) => {
                    console.log(error)
                })
                .finally(() => {
                    nodesUp.value = 131
                    nodesTotal.value = 157
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        nodesUp,
        nodesTotal,
        checkNodes,
    }
})
