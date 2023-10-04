import axios, { AxiosRequestHeaders } from "axios";
import { authService } from "./authService";


const API = axios.create({
});

API.interceptors.request.use(
    async config => {
        const access_token = localStorage.getItem("accessToken");

        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${access_token}`,
        } as AxiosRequestHeaders

        return config;
    },
    error => {
        Promise.reject(error)
    });

API.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            authService.signout();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    });

export default API;
