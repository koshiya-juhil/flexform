import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { purple } from "@mui/material/colors";
import { IISMethods } from "../../config/IISMethods";
import { GenericObjectType, anyValue } from "../../config/Types";
import { ResponseControllerLocalState } from "../../Controller/ResponseController";
import Spinner from "../components/Spinner";

interface ResponseFormProps {
    handleFormData: (type: string, key: number | string, value: string | number | boolean, index?: number) => void;
    submitResponse: (responseData?: anyValue, form?: anyValue, paymentStatus?: boolean) => void;
    setDefaultFormData: () => void;
    makePayment: () => void;
    responseSubmitted: boolean;
    formname: string;
    localState: ResponseControllerLocalState;
    setLocalState: React.Dispatch<React.SetStateAction<ResponseControllerLocalState>>;
}

function ResponseForm(props: ResponseFormProps) {

    const formData = useSelector((store: RootState) => store.form);
    const responseFormData = useSelector((store: RootState) => store.state.responseFormData);
    const user: GenericObjectType | null = IISMethods.getLocalStorageData('user');

    return (
        <div className="bg-slate-100 h-full mt-3">
            <div className="pb-7 m-auto w-45p">

                {formData.isActive === false ?
                    <div className="question_title_section border-light rounded-lg">
                        <div className="bg-white border-t-8 border-t-purple-800 rounded-lg pb-5 pt-3 px-6">
                            <h1 className="text-2xl font-semibold">{formData.title}</h1>
                            <p className="text-base mt-2 font-medium">{formData.description}</p>
                            <p className="mt-4 text-base">This form is not active at the moment. Please get in touch with the owner.</p>
                        </div>
                    </div>
                    :
                    <>
                        {props.responseSubmitted === true ?
                            <>
                                <div className="question_title_section border-light rounded-lg">
                                    <div className="bg-white border-t-8 border-t-purple-800 rounded-lg pb-5 pt-3 px-6">
                                        <h1 className="text-2xl font-semibold">{formData.title}</h1>
                                        <p className="text-base mt-2 font-medium">{formData.description}</p>
                                        <p className="mt-4 text-base">Your response has been recorded.</p>
                                    </div>
                                </div>
                            </>

                            :
                            <>
                                {/* Title, Description */}
                                <div className="question_title_section border-light rounded-lg">
                                    <div className="bg-white border-t-8 border-t-purple-800 rounded-lg pb-5 pt-3 px-6">
                                        <h1 className="text-2xl font-semibold">{formData.title}</h1>
                                        <p className="text-base mt-2">{formData.description}</p>
                                        <hr className="my-3"></hr>
                                        {user && <p className="text-sm"> <span>Logged in as : </span> <span className="font-bold text-gray-600">{user.email}</span> </p>}
                                    </div>
                                </div>

                                {/* Questions */}
                                {formData.formfields.map((field, index) => (
                                    <div className="form-group bg-white rounded-lg py-6 px-4 flex flex-col w-full my-3 border-light" key={index}>
                                        {/* question name */}
                                        <div className="mb-4">{field.text} {field.required ? <span className="text-red-700"> * </span> : <></>}</div>

                                        <div>
                                            {field.type === 'text' ?
                                                <input type="text" placeholder="Your answer" className="box-border text-sm w-1/2 outline-none border-bottom-slight h-8 focus:border-b-purple-800 focus:border-b-2"
                                                    id={`${props.formname ? props.formname : 'form'}-${index}`}
                                                    value={responseFormData[index]}
                                                    onChange={(e) => props.handleFormData(field.type, index, e.target.value)}
                                                />

                                                : field.type === 'paragraph' ?
                                                    <textarea placeholder="Your answer"
                                                        id={`${props.formname ? props.formname : 'form'}-${index}`}
                                                        className="box-border text-sm w-full outline-none border-bottom-slight h-8 focus:border-b-purple-800 focus:border-b-2 resize-none overflow-hidden"
                                                        value={responseFormData[index]}
                                                        onInput={(e) => {
                                                            e.currentTarget.style.height = '';
                                                            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                                        }}
                                                        onChange={(e) => {
                                                            props.handleFormData(field.type, index, e.target.value);
                                                        }}
                                                    />

                                                    : field.type === 'radio' ?
                                                        <div id={`${props.formname ? props.formname : 'form'}-${index}`}>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                value={responseFormData[index]}
                                                                name="radio-buttons-group"
                                                                onChange={(e) => props.handleFormData(field.type, index, e.target.value)}
                                                            >
                                                                {field.options.map((option, i) => (
                                                                    <FormControlLabel
                                                                        value={i}
                                                                        control={
                                                                            <Radio
                                                                                sx={{
                                                                                    '&.Mui-checked': {
                                                                                        color: purple[800],
                                                                                    },
                                                                                }}
                                                                            />
                                                                        }
                                                                        label={option.label}
                                                                    />
                                                                ))}
                                                            </RadioGroup>
                                                            {!field.required && responseFormData[index] >= 0 ?
                                                                <button className="text-gray-700 hover:bg-slate-100 p-1 rounded text-sm float-right" 
                                                                    onClick={() => props.handleFormData(field.type, index, -1)}
                                                                >Clear Selection</button> 
                                                            : <></>}
                                                        </div>

                                                        : field.type === 'checkbox' ?
                                                            <div className="flex flex-col" id={`${props.formname ? props.formname : 'form'}-${index}`} key={`${field.field + index}`}>
                                                                {field.options.map((option, i) => (
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                sx={{
                                                                                    '&.Mui-checked': {
                                                                                        color: purple[800],
                                                                                    }
                                                                                }}
                                                                                onChange={(e) => props.handleFormData(field.type, index, e.target.checked, i)}
                                                                                checked={responseFormData[index]?.includes(i) || false}
                                                                            />
                                                                        }
                                                                        label={option.label}
                                                                        key={`${option.label+index}`}
                                                                    />
                                                                ))}
                                                            </div>

                                                            : <></>}
                                        </div>

                                        <div 
                                            id={`${props.formname ? props.formname : 'form'}-${index}-errortext`} 
                                            className="error-text text-xs"
                                        ></div>

                                    </div>
                                ))}

                                {/* Payment btn */}
                                <div className="form-group rounded-lg flex flex-col w-full my-3">
                                    <button className="flex justify-center items-center px-5 py-2 bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg"
                                        onClick={() => {
                                            props.setLocalState({ ...props.localState, disableButton: true });
                                            props.makePayment()
                                        }}
                                        disabled={props.localState.disableButton}
                                    >
                                        {props.localState.disableButton && <Spinner />}
                                        <span className="ml-2">{props.localState.disableButton ? 'Connecting to Stripe...' : 'Make Payment'}</span>
                                    </button>
                                </div>

                                <div className="flex justify-between">
                                    <button onClick={() => props.submitResponse()} className="px-5 py-2  bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg">Submit</button>
                                    <button onClick={() => props.setDefaultFormData()} className="px-2 py-1  text-purple-800 text-sm rounded-md font-semibold hover:bg-slate-200">Clear form</button>
                                </div>
                            </>
                        }

                    </>
                }


                <div className="flex justify-center items-center mt-6 text-2xl text-gray-500">
                    <span className="mr-1 font-medium">Flex</span>
                    <span className="font-normal">Forms</span>
                </div>


            </div>
        </div>
    )
}

export default ResponseForm