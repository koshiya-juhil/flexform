import { useEffect, useState } from "react"
import ResponseForm from "../view/response/ResponseForm"
import { Config, IISMethods, JsCall } from "../config/IISMethods"
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setForm, clearForm } from "../redux/formSlice";
import { setState } from "../redux/stateSlice";
import { GenericObjectType, anyValue } from "../config/Types";
import { loadStripe } from "@stripe/stripe-js";

interface ResponseControllerProps {
    formname: string;
}

function ResponseController(props: ResponseControllerProps) {
    const navigate = useNavigate();
    const { formId } = useParams();
    const dispatch = useDispatch();
    const formData = useSelector((store: RootState) => store.form);
    const state = useSelector((store: RootState) => store.state);

    const [responseSubmitted, setResponseSubmitted] = useState<boolean>(false);

    useEffect(() => {
        getFormById();

        return (() => {
            dispatch(clearForm());
        })

    }, [formId])


    useEffect(() => {
        setDefaultFormData();
    }, [formData])

    useEffect(() => {


        // const state = window.history.state;

        const queryParams = new URLSearchParams(window.location.search);
        const paymentStatus = queryParams.get('payment_status');

        if (paymentStatus) {
            const savedResponseFormData: anyValue = IISMethods.getLocalStorageData('responseFormData');
            const savedFormData = IISMethods.getLocalStorageData('formData');

            if (savedResponseFormData) {
                dispatch(setState({ responseFormData: { ...savedResponseFormData } }));
            }

            if (paymentStatus === 'success' && savedFormData && savedResponseFormData) {
                submitResponse(savedResponseFormData, savedFormData);
            }

            if (paymentStatus === 'cancel' || paymentStatus === 'success') {
                navigate(window.location.pathname, { replace: true });
            }

            IISMethods.clearLocalStorageData('responseFormData');
            IISMethods.clearLocalStorageData('formData');
        }

    }, [])



    async function getFormById() {
        const url = Config.serverUrl + 'form' + '/' + formId;

        await IISMethods.axiosRequest('get', url, {}, {}, SuccessCallback, ErrorCallback);

        function SuccessCallback(res: AxiosResponse): void {
            dispatch(setForm(res.data.response));

        }

        function ErrorCallback(err: AxiosError | Error): void {
            console.log(err);
        }
    }

    function setDefaultFormData() {
        const tempFormData: GenericObjectType = {};
        formData.formfields.map((field: { type: string }, index: number) => {
            if (field.type === 'text' || field.type === 'paragraph') {
                tempFormData[index] = '';
            }
            else if (field.type === 'radio') {
                tempFormData[index] = 0;
            }
            else if (field.type === 'checkbox') {
                // tempFormData[index] = new Array(tempFormData[index].options.length).fill(false);
                tempFormData[index] = [];
            }
        })
        dispatch(setState({ responseFormData: tempFormData }))
    }

    function handleFormData(type: string, key: number | string, value: string | number | boolean, index?: number) {
        const tempFormData = IISMethods.getCopy(state.responseFormData);

        if (type === 'text' || type === 'paragraph' || type === 'radio') {
            tempFormData[key] = value;
        }
        else if (type === 'checkbox') {
            let arr = tempFormData[key];
            if (value === true) {
                if (!arr.includes(index)) {
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

    async function submitResponse(responseData?: anyValue, form?: anyValue) {
        const responseFormData = responseData ? responseData : state.responseFormData;
        const tempFormData = form ? form : formData;

        if (JsCall.validateForm(state.responseFormData, tempFormData.formfields, -1, props.formname, true)) {
            IISMethods.localnotify("Fill all required data", 2);
            return;
        }
        else if(formData.paymentDetails.required){
            IISMethods.localnotify("Payment required", 2);
            return;
        }

        const url = Config.serverUrl + 'form' + '/response' + '/add'

        const responses: GenericObjectType[] = [];
        Object.entries(responseFormData).map(([key, value]) => {
            const obj: GenericObjectType = {};
            const field = tempFormData.formfields[Number(key)];

            obj.fieldId = field._id;

            if (field.type === 'checkbox') {
                if (Array.isArray(value)) {
                    obj.response = value.map((val: number) => {
                        return { id: field.options[val]._id, value: field.options[val].label }
                    })
                }
            }
            else if (field.type === 'radio') {
                obj.response = { id: field.options[Number(value)]._id, value: field.options[Number(value)].label };
            }
            else {
                obj.response = value;
            }

            responses.push(obj);
        })

        const user: GenericObjectType | null = IISMethods.getLocalStorageData('user');

        const reqData = {
            formId: tempFormData._id,
            responses: responses,
            submittedBy: {
                id: user ? user._id : '',
                name: '',
                email: user ? user.email : '',
            }
        }

        IISMethods.axiosRequest('post', url, reqData, {}, SuccessCallback, ErrorCallback);

        function SuccessCallback() {
            setResponseSubmitted(true);
        }

        function ErrorCallback(error: AxiosError | Error) {
            console.log("error", error);
        }

    }

    const makePayment = async () => {
        if (JsCall.validateForm(state.responseFormData, formData.formfields, -1, props.formname, true)) {
            IISMethods.localnotify("Fill all required data", 2);
            return;
        }

        // window.history.pushState({responseFormData : state.responseFormData, formData: formData}, '', window.location.href);

        // storing data for submit response data
        IISMethods.setLocalStorageData('responseFormData', state.responseFormData);
        IISMethods.setLocalStorageData('formData', formData);

        // const stripe_publishable_key = "pk_test_51PU8J4SDoT5YA6Sz7YH9fdYADdSkqLHj2wfZ1LsMHaQsQYWwRAUM1vC6MxytUtQLFT7b078aRDtDqZfenTg1JLF200AfdtuDCA";
        const stripe_publishable_key = formData.paymentDetails?.stripe_publishable_key;
        const stripe = await loadStripe(stripe_publishable_key);
        const url = Config.serverUrl + 'api/stripe-checkout-session'
        const reqBody = {
            ...formData.paymentDetails,
            current_url: window.location.href
        }

        IISMethods.axiosRequest('post', url, reqBody, {}, successCallback, errorCallback);

        async function successCallback(res: AxiosResponse) {
            const result = await stripe?.redirectToCheckout({
                sessionId: res.data.id
            })

            if (result && result.error) {
                console.log(result.error);
            }
        }

        function errorCallback(error: AxiosError | Error) {
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
                makePayment={makePayment}
            />
        </>
    )
}

export default ResponseController