import axios from "axios";

export default axios.create({
    baseURL: "https://ninehearts-sandbox.com/api",
    headers: {
        "Content-type": "application/json"
    }
});