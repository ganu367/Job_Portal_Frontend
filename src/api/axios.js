import axios from "axios";
const BASE_URL = "https://backendjobs.acecomskills.in/"; // https://backendjobs.acecomskills.in/       http://localhost:8000/

export default axios.create({
    baseURL: BASE_URL //okcowork = 192.168.0.102, ishxxn = 192.168.109.39
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});