import { useCallback, useEffect, useState } from "react"
import Home from "../view/home/Home"
import { Config, IISMethods } from "../config/IISMethods";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../redux/stateSlice";
import _debounce from 'lodash.debounce'
import { RootState } from "../redux/store";

function HomeController() {

    const dispatch = useDispatch();
    const state = useSelector((store: RootState) => store.state);

    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        listForms();
    }, [])
    
    async function listForms(){
        const url = Config.serverUrl + 'form' + '/list';

        IISMethods.axiosRequest('get', url, {}, {}, listSuccessCallback, listErrorCallback);

        function listSuccessCallback(res: AxiosResponse): void{
            dispatch(setState({ myForms: res.data.response }));
        }

        function listErrorCallback(err: AxiosError | Error): void{
            console.log(err);
        }
    }

    const debounceFn = useCallback(_debounce(getSearchData, 500), []);

    function handleSearchQuery(value: string){
        setSearchQuery(value);
        debounceFn(value);
    }

    function getSearchData(value: string = ''){

        if(!value.length){
            listForms();
            return;
        }
        
        const url = Config.serverUrl + 'form/' + 'search/' + value;
        IISMethods.axiosRequest('get', url, {}, {}, successCallback, errorCallback);

        function successCallback(res: AxiosResponse){
            dispatch(setState({ myForms: res.data.response }));
        }

        function errorCallback(error: AxiosError | Error){
            console.log(error);
        }

    }

    const handleDeleteForm = (formId: string) => {
        const url = Config.serverUrl + 'form' + '/' + formId;
    
        IISMethods.axiosRequest('delete', url, {}, {}, successCallback, errorCallback);
    
        function successCallback(res: AxiosResponse){
            console.log("res.data", res.data);
            const tempFormData = IISMethods.removeObjectFromArray(IISMethods.getCopy(state.myForms), '_id', res.data.response._id);
            dispatch(setState({ myForms: tempFormData }))
        }
    
        function errorCallback(error: AxiosError | Error){
          console.log(error);
        }
    }


    return (
        <>
            <Home 
                searchQuery={searchQuery}
                handleSearchQuery={handleSearchQuery}
                handleDeleteForm={handleDeleteForm}
            />
        </>
    )
}

export default HomeController