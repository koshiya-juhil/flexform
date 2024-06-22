import { useEffect, useState } from "react"
import ResponseForm from "../view/response/ResponseForm"
import { Config, IISMethods, JsCall } from "../config/IISMethods"
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setForm, clearForm } from "../redux/formSlice";
import { setState } from "../redux/stateSlice";
import { GenericObjectType } from "../config/Types";

interface ResponseControllerProps {
    formname: string;
}

function ResponseController(props: ResponseControllerProps) {
    const { formId } = useParams();
    const dispatch = useDispatch();
    const formData = useSelector((store: RootState) => store.form);
    const state = useSelector((store: RootState) => store.state);

    const [responseSubmitted, setResponseSubmitted] = useState<boolean>(false);

    useEffect(() => {
        getFormById();

        return(() => {
            dispatch(clearForm());
        })

    }, [formId])
    

    useEffect(() => {
        setDefaultFormData();
    }, [formData])
    

    async function getFormById() {
        const url = Config.serverUrl + 'form' + '/' + formId;

        await IISMethods.axiosRequest('get', url, {}, {}, SuccessCallback, ErrorCallback);

        function SuccessCallback(res: AxiosResponse): void {
            console.log(res.data);
            dispatch(setForm(res.data));

        }
        
        function ErrorCallback(err: AxiosError | Error): void {
            console.log(err);
        }
    }

    function setDefaultFormData(){
        const tempFormData : GenericObjectType = {};
        formData.formfields.map((field: { type: string }, index : number) => {
            if(field.type === 'text' || field.type === 'paragraph'){
                tempFormData[index] = '';
            }
            else if(field.type === 'radio'){
                tempFormData[index] = 0;
            }
            else if(field.type === 'checkbox'){
                // tempFormData[index] = new Array(tempFormData[index].options.length).fill(false);
                tempFormData[index] = [];
            }
        })
        dispatch(setState({ responseFormData: tempFormData }))
    }

    function handleFormData(type: string, key: number | string, value: string | number | boolean, index?: number){
        // console.log(typeof value);
        const tempFormData = IISMethods.getCopy(state.responseFormData);

        if(type === 'text' || type === 'paragraph' || type === 'radio'){
            tempFormData[key] = value;
        }
        else if(type === 'checkbox'){
            let arr = tempFormData[key];
            if(value === true){
                if(!arr.includes(index)){
                    arr = [...arr, index]
                }
            }
            else {
                arr = arr.filter((j: number) => j != index);
            }
            tempFormData[key] = arr;
        }

        dispatch(setState({ responseFormData: tempFormData }));

        JsCall.validateForm(tempFormData, formData.formfields, Number(key), props.formname, true);
        
    }

    async function submitResponse(){
        const url = Config.serverUrl + 'form' + '/response' + '/add'

        const responses: GenericObjectType[] = [];
        Object.entries(state.responseFormData).map(([key, value]) => {
            const obj: GenericObjectType = {};
            const field = formData.formfields[Number(key)];
            
            obj.fieldId = field._id;

            if(field.type === 'checkbox'){
                if(Array.isArray(value)){
                    obj.response = value.map((val: number) => {
                        return { id: field.options[val]._id, value: field.options[val].label }
                    })
                }
            }
            else if(field.type === 'radio'){
                obj.response = { id: field.options[Number(value)]._id, value: field.options[Number(value)].label };
            }
            else {
                obj.response = value;
            }

            responses.push(obj);
        })

        const user: GenericObjectType | null = IISMethods.getLocalStorageData('user');

        const reqData = {
            formId: formData._id,
            responses: responses,
            submittedBy: {
                id: user ? user._id : '',
                name: '',
                email: user ? user.email : '',
            }
        }

        console.log("reqData", reqData);

        IISMethods.axiosRequest('post', url, reqData, {}, SuccessCallback, ErrorCallback);
        
        function SuccessCallback(res: AxiosResponse){
            console.log("res.data", res.data);
            setResponseSubmitted(true);
        }

        function ErrorCallback(error: AxiosError | Error){
            console.log("error", error);
        }

    }


    return (
        <>
            <ResponseForm
                handleFormData={handleFormData}
                submitResponse={submitResponse}
                setDefaultFormData={setDefaultFormData}
                responseSubmitted={responseSubmitted}
                formname={props.formname}
            />
        </>
    )
}

export default ResponseController