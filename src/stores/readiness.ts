import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HTTP } from "@/api/http-commons";

export const useReadinessStore= defineStore('readiness', () => {
    const readiness = ref(false)

    async function checkReadiness() {
        try {
            await HTTP.get("/readiness")
                .then((response) => {
                    readiness.value = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        readiness,
        checkReadiness,
    }
})
