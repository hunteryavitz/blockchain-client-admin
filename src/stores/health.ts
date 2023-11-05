import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { HTTP } from "@/api/http-commons";

export const useHealthStore= defineStore('health', () => {
    // const health = ref(0.0)
    const health = ref([0.0, 0.0, 0.0, 0.0, 0.0])

    const average = computed(() => {
        return health.value.reduce((a, b) => a + b, 0) / health.value.length
    })

    async function checkHealth() {
        try {
            await HTTP.get("/healthMetric/health")
                .then((response) => {
                    console.log(response.data)
                    health.value = response.data
                    // health.value = 80.0
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        health,
        checkHealth,
        average
    }
})
