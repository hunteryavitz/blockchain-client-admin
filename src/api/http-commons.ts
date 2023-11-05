import axios from "axios";

export const HTTP = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    // baseURL: "https://ninehearts-sandbox.com/api/v1",
    headers: {
        "Content-type": "application/json"
    }
});
