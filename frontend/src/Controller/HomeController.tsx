import { useEffect } from "react"
import Home from "../view/home/Home"
import { Config, IISMethods } from "../config/IISMethods";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setState } from "../redux/stateSlice";

function HomeController() {

    const dispatch = useDispatch();

    useEffect(() => {
        listForms();
    }, [])
    
    async function listForms(){
        const url = Config.serverUrl + 'form' + '/list';

        IISMethods.axiosRequest('get', url, {}, {}, listSuccessCallback, listErrorCallback);

        function listSuccessCallback(res: AxiosResponse): void{
            dispatch(setState({ myForms: res.data }));
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