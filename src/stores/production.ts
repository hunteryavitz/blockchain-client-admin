import {defineStore} from "pinia";
import {ref} from "vue";
import {HTTP} from "@/api/http-commons";

export const useProductionStore = defineStore('production', () => {
    const data1 = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const data2 = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const productionPayload = ref({
        data: {
            dataset1: data1,
            dataset2: data2
        }
    })

    async function getProduction(): Promise<void> {
        try {
            await HTTP.get("/healthMetric/getProductionHealth")
                .then((response) => {
                    productionPayload.value = response.data
                    data1.value = productionPayload.value.data.dataset1
                    data2.value = productionPayload.value.data.dataset2
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return {
        data1,
        data2,
        productionPayload,
        getProduction,
    }
})
