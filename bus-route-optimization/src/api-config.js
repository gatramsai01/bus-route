import axios from "axios";

export const expressApi=axios.create(
    {
        baseURL:"http://127.0.0.1:5000"
    }
)


export const flaskApi=axios.create({
    baseURL:"http://localhost:8001/"
})