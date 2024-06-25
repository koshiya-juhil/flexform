import { useState } from "react";
import Signup from "../view/register/Signup";
import SignIn from "../view/register/Signin";
import { Config, IISMethods } from "../config/IISMethods";
import { GenericObjectType } from "../config/Types";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface UserProps {
    pagename: string;
}

function UserController(props : UserProps) {

    const navigate = useNavigate();

    // const [state, setState] = useState<Record<string, any>>({});
    const [state, setState] = useState<GenericObjectType>({});

    const handleForm: (key: string, value: string) => void = (key, value) => {
        const tempState = IISMethods.getCopy(state);

        tempState[key] = value;

        setState(tempState);
    }

    const handleSignUp = () => {
        const url = Config.serverUrl + props.pagename;
        const { email, password } = state;
        const reqData = { email, password };

        IISMethods.axiosRequest('post', url, reqData, {}, addSuccessCallback, addErrorCallback);

        function addSuccessCallback(res: AxiosResponse): void{
            console.log(res);
            IISMethods.setLocalStorageData('user', res.data.user);
            navigate('/');
        }

        function addErrorCallback(err: AxiosError | Error): void{
            console.log(err);
        }

    }

    const handleSignIn = async () => {
        const url = Config.serverUrl + props.pagename;
        const { email, password } = state;
        const reqData = { email, password };

        IISMethods.axiosRequest('post', url, reqData, {}, addSuccessCallback, addErrorCallback);

        function addSuccessCallback(res: AxiosResponse): void{
            IISMethods.setLocalStorageData('user', res.data.user);
            navigate('/');
        }

        function addErrorCallback(err: AxiosError | Error): void{
            console.log(err);
        }

    }

    return (
        props.pagename === 'signin' ? 
            <SignIn 
                key='signin' 
                handleForm={handleForm}
                handleSignIn={handleSignIn}
                state={state}
            />
        : props.pagename === 'signup' ? 
            <Signup 
                key='signup'
                handleForm={handleForm}
                handleSignUp={handleSignUp}
                state={state}
            />
        : <></>
        
    )
}

export default UserController