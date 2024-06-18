import axios, { AxiosError } from "axios";
import { Config, IISMethods } from "./IISMethods";

const baseUrl = Config.serverUrl;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true
})

// for request use
// axiosInstance.interceptors.request.use

// for response
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },

    (error: AxiosError) => {
        if(error.response && error.response.status === 401){
            IISMethods.clearLocalStorageData('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;