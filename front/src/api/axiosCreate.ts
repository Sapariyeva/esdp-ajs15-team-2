import axios from "axios";

const axiosCreate = axios.create({
    baseURL: "http://localhost:8000",
})

export default axiosCreate;
