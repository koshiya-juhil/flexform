import { purple } from "@mui/material/colors";
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel, Radio, RadioGroup, Switch, styled } from "@mui/material";
import { IISMethods } from "../../config/IISMethods";
import { AnyArray, anyValue } from "../../config/Types";
import { useEffect, useState } from "react";

interface ResponseViewProps {
    handleUpdateForm: () => void;
}

const PurpleSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: purple[800],
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: purple[800],
    },
  }));

function ResponseView(props: ResponseViewProps) {

    const formData = useSelector((store: RootState) => store.form);
    const formResponses = useSelector((store: RootState) => store.state.formResponses);

    const [responseFormData, setResponseFormData] = useState<AnyArray>([]);
    const [responseIndex, setResponseIndex] = useState<number>(0);

    const formResponse = formResponses[responseIndex];

    useEffect(() => {
        if(formResponse){
            generateResponseData();
        }
    }, [formResponse]);
    

    function generateResponseData(){
        const responses = formResponse.responses;
        console.log("Function called", responses);

        const tempArr: AnyArray = [];

        formData.formfields.map((field, index) => {
            const response = IISMethods.getobjectfromarray(responses, 'fieldId', field._id)?.response;
            let value : anyValue = '';
            if(field.type === 'text' || field.type === 'paragraph'){
                value = response;
            }
            else if(field.type === 'radio'){
                value = IISMethods.getindexfromarray(field.options, '_id', response.id);
            }
            else if(field.type === 'checkbox'){
                const arr: number[] = [];
                response.map((res : { id: string }) => {
                    arr.push(IISMethods.getindexfromarray(field.options, '_id', res.id));
                })
                value = arr;
            }
            tempArr[index] = value;
        })

        setResponseFormData(tempArr);
    }
    
    console.log("responseFormData", responseFormData)

    return (
        <div className="bg-slate-100 h-full mt-3">
            <div className="pb-7 m-auto w-45p">

                <div className="border-light rounded-lg my-2">
                    <div className="flex flex-row justify-between bg-white rounded-lg pb-5 pt-3 px-6">
                        <h1 className="text-2xl font-medium">{formResponses.length} Responses</h1>
                        <div>
                            <span className="text-sm text-slate-600">Accepting responses</span>
                            <PurpleSwitch
                                checked={formData.isActive}
                                onChange={() => props.handleUpdateForm()} 
                                // sx={{
                                //     '&.MuiSwitch-switchBase.Mui-checked': {
                                //         color: purple[800],
                                //     },
                                // }}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center mb-1">
                    <button className="px-3 py-1 m-1 bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg"
                        onClick={() => setResponseIndex(prev => prev-1)}
                        disabled={responseIndex == 0}
                    >Prev</button>

                    <p>{responseIndex+1} of {formResponses.length}</p>

                    <button className="px-3 py-1 m-1 bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg"
                        onClick={() => setResponseIndex(prev => prev+1)}
                        disabled={responseIndex == (formResponses.length-1)}
                    >Next</button>
                </div>

                <div className="question_title_section border-light rounded-lg">
                    <div className="bg-white border-t-8 border-t-purple-800 rounded-lg pb-5 pt-3 px-6">
                        <h1 className="text-2xl font-semibold">{formData.title}</h1>
                        <p className="text-base mt-2 font-medium">{formData.description}</p>
                        <p className="mt-4 text-base">Your response has been recorded.</p>
                    </div>
                </div>


                {/* Questions */}
                {formData.formfields.map((field, index) => (
                    <div className="bg-white rounded-lg py-6 px-4 capitalize flex flex-col w-full my-3 border-light" key={index}>
                        {/* question name */}
                        <div className="mb-4">{field.text}</div>

                        <div>
                            {field.type === 'text' ?
                                <input type="text" placeholder="Your answer" className="box-border text-sm w-1/2 outline-none border-bottom-slight h-8 focus:border-b-purple-800 focus:border-b-2"
                                    defaultValue={responseFormData[index]}
                                    disabled={true}
                                />

                                : field.type === 'paragraph' ?
                                    <textarea placeholder="Your answer"
                                        className="box-border text-sm w-full outline-none border-bottom-slight h-8 focus:border-b-purple-800 focus:border-b-2 resize-none overflow-hidden"
                                        value={responseFormData[index]}
                                        onInput={(e) => {
                                            e.currentTarget.style.height = '';
                                            e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                        }}
                                        disabled={true}
                                    />

                                    : field.type === 'radio' ?
                                        <div>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                // value={responseFormData[index]}
                                                name="radio-buttons-group"
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
                                                        checked={i == responseFormData[index]}
                                                        disabled={i != responseFormData[index]}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        : field.type === 'checkbox' ?
                                            <div className="flex flex-col">
                                                {field.options.map((option, i) => (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                sx={{
                                                                    '&.Mui-checked': {
                                                                        color: purple[800],
                                                                    }
                                                                }}
                                                                checked={responseFormData[index]?.includes(i) || false}
                                                                disabled={responseFormData[index]?.includes(i) ? false : true}
                                                            />
                                                        }
                                                        label={option.label}
                                                    />
                                                ))}
                                            </div>

                                            : <></>}
                        </div>

                    </div>
                ))}

                <div className="flex justify-center items-center mt-6 text-2xl text-gray-500">
                    <span className="mr-1 font-medium">Flex</span>
                    <span className="font-normal">Forms</span>
                </div>


            </div>
        </div>
    )
}

export default ResponseView