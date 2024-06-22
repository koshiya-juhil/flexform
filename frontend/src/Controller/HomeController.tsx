import { useEffect } from "react"
import Home from "../view/home/Home"
import { Config, IISMethods } from "../config/IISMethods";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setState } from "../redux/stateSlice";
import { useNavigate } from "react-router-dom";

function HomeController() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    function handleLogout(){
        IISMethods.clearCookie('token');

        IISMethods.clearLocalStorageData('user');
        navigate('/signin');
    }

    return (
        <>
            <Home 
                handleLogout={handleLogout}
            />
        </>
    )
}

export default HomeController