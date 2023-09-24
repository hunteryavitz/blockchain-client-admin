import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HTTP } from "@/api/http-commons";

export const useReadinessStore= defineStore('readiness', () => {
    const readiness = ref(false)
    const liveness = ref(0.0)

    // const doubleCount = computed(() => count.value * 2)

    async function checkReadiness() {
        try {
            await HTTP.get("/readiness")
                .then((response) => {
                    readiness.value = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    console.log("finally")
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function checkLiveness() {
        try {
            await HTTP.get("/liveness")
                .then((response) => {
                    liveness.value = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    console.log("finally")
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        readiness,
        checkReadiness,
        liveness,
        checkLiveness,
    }
})
