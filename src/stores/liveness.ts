import { HTTP } from "@/api/http-commons"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLivenessStore= defineStore('liveness', () => {
    const liveness = ref(0.0)

    async function checkLiveness() {
        try {
            await HTTP.get("/liveness")
                .then((response) => {
                    liveness.value = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        liveness,
        checkLiveness,
    }
})
