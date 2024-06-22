import { useCallback, useEffect, useState } from "react"
import Home from "../view/home/Home"
import { Config, IISMethods } from "../config/IISMethods";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { setState } from "../redux/stateSlice";
import { useNavigate } from "react-router-dom";
import _debounce from 'lodash.debounce'

function HomeController() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState<string>('');

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

    const debounceFn = useCallback(_debounce(getSearchData, 500), []);

    function handleSearchQuery(value: string){
        setSearchQuery(value);
        debounceFn(value);
    }

    function getSearchData(value: string = ''){
        console.log("getSearchData......", value);

        if(!value.length){
            listForms();
            return;
        }
        
        const url = Config.serverUrl + 'form/' + 'search/' + value;
        IISMethods.axiosRequest('get', url, {}, {}, successCallback, errorCallback);

        function successCallback(res: AxiosResponse){
            console.log("res", res.data);
            dispatch(setState({ myForms: res.data }));
        }

        function errorCallback(error: AxiosError | Error){
            console.log(error);
        }

    }


    return (
        <>
            <Home 
                handleLogout={handleLogout}
                searchQuery={searchQuery}
                handleSearchQuery={handleSearchQuery}
            />
        </>
    )
}

export default HomeController