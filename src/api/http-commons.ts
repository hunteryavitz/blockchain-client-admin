import axios from "axios";

export const HTTP = axios.create({
    baseURL: "https://ninehearts-sandbox.com/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});
