import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";

export const useReadinessStore= defineStore('readiness', () => {
    const readiness = ref(false)
    const liveness = ref(0.0)

    // const doubleCount = computed(() => count.value * 2)

    async function checkReadiness() {
        try {
            await axios.get("https://ninehearts-sandbox.com/api/v1/readiness")
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
            await axios.get("https://ninehearts-sandbox.com/api/v1/liveness")
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
