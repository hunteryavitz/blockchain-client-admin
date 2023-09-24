import { ref } from 'vue'
import { defineStore } from 'pinia'
import { HTTP } from "@/api/http-commons";

export const useValidityStore= defineStore('validity', () => {
    const validity = ref(false)

    async function checkValidity() {
        try {
            await HTTP.get("/blockchain/verifyBlockchain")
                .then((response) => {
                    validity.value = response.data
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        validity,
        checkValidity,
    }
})
