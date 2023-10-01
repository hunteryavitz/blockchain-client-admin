import { defineStore } from "pinia";
import { ref } from "vue";
import { HTTP } from "@/api/http-commons";

export const useHealthStore= defineStore('health', () => {
    // const health = ref(0.0)
    // define a const array of numbers
    const health = ref([0.0, 0.0, 0.0, 0.0, 0.0])

    async function checkHealth() {
        try {
            await HTTP.get("/health")
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
    }
})
