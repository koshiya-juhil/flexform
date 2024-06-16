import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import _Config from './Config';
import { toast } from 'react-toastify';

export const Config = new _Config();

class _IISMethods {
    constructor(){
        
    }

    getPagename(){
        const url = window.location.pathname;
        const pagename = url.split("/");
        return pagename[pagename.length - 1];
    }

    // Local Storage Functions
    setLocalStorageData<T>(key: string, value: T){
        localStorage.setItem(key, JSON.stringify(value));
    }

    getLocalStorageData<T>(key: string): T | null{
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    clearLocalStorageData(key: string){
        localStorage.removeItem(key);
    }

    // Session Storage Functions
    setSessionStorageData<T>(key: string, value: T){
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getSessionStorageData<T>(key: string): T | null{
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    clearSessionStorageData(key: string){
        sessionStorage.removeItem(key);
    }


    getCopy<T extends object>(element: T | T[]): T | T[]{
        try {
            if(Array.isArray(element)){
                return element.map(o => Object.assign({}, o));
            } else {
                return Object.assign({}, element);
            }
        } catch (error) {
            return Object.assign({}, element);
        }
    }



    async axiosRequest<T>(
        method: AxiosRequestConfig['method'],
        url: string,
        reqBody: T,
        reqHeaders: Record<string, string>,
        successCallback: (response: AxiosResponse) => void,
        errorCallback: (error: AxiosError | Error) => void
    ): Promise<void> {

        try {
            const response = await axios({
                method: method,
                url: url,
                data: reqBody,
                headers: reqHeaders,
                withCredentials: true
            });
            successCallback(response);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if(error.response?.status === 401){
                    IISMethods.localnotify('Login to continue.', 0);
                    IISMethods.clearLocalStorageData('user');
                    // window.location.href = '/login';
                    // sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
                    // redirect to login and after login redirect back 
                }

                if(error?.response?.data.notify){
                    IISMethods.localnotify(error?.response.data.error, 0);
                }

                errorCallback(error);
            } else {
                // Handle non-Axios errors
                errorCallback(new Error('An unexpected error occurred'));
            }
        }
    }

    localnotify(message: string, status: number){
        if(status === 1){
            toast.success(message);
        }
        else if(status === 2){
            toast.warn(message);
        }
        else {
            toast.error(message);
        }
    }


}

export const IISMethods = new _IISMethods();