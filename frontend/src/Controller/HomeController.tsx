import { useEffect } from "react"
import Home from "../view/home/Home"
import { Config, IISMethods } from "../config/IISMethods";
import { AxiosError, AxiosResponse } from "axios";

function HomeController() {

    useEffect(() => {
        listForms();
    }, [])
    
    async function listForms(){
        const url = Config.webUrl + 'form' + '/list';

        IISMethods.axiosRequest('get', url, {}, {}, listSuccessCallback, listErrorCallback);

        function listSuccessCallback(res: AxiosResponse): void{
            console.log(res);
        }

        function listErrorCallback(err: AxiosError | Error): void{
            console.log(err);
        }
    }

    return (
        <>
            <Home />
        </>
    )
}

export default HomeController