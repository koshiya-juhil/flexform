import { useEffect } from "react"
import ResponseForm from "../view/form/ResponseForm"
import { Config, IISMethods } from "../config/IISMethods"
import { AxiosError, AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setForm, clearForm } from "../redux/formSlice";
import { setState } from "../redux/stateSlice";
import { GenericStateType } from "../config/Types";

function ResponseController() {
    const { formId } = useParams();
    const dispatch = useDispatch();
    const formData = useSelector((store: RootState) => store.form);
    const state = useSelector((store: RootState) => store.state);

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
        const url = Config.webUrl + 'form' + '/' + formId;

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
        const tempFormData : GenericStateType = {};
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
    }

    async function submitResponse(){
        // const url = Config.webUrl + 'response' + '/add'

        const responses: GenericStateType[] = [];
        Object.entries(state.responseFormData).map(([key, value]) => {
            const obj: GenericStateType = {};
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

        const reqData = {
            formId: formData._id,
            responses: responses,
            submittedBy: {
                id: '',
                name: '',
                email: ''
            }
        }

        console.log("reqData", reqData);

    }


    return (
        <>
            <ResponseForm
                handleFormData={handleFormData}
                submitResponse={submitResponse}
            />
        </>
    )
}

export default ResponseController