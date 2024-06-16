import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { purple } from "@mui/material/colors";

interface ResponseFormProps {
    handleFormData: (type: string, key: number | string, value: string | number | boolean, index?: number) => void;
    submitResponse: () => void;
}

function ResponseForm(props: ResponseFormProps) {

    const formData = useSelector((store: RootState) => store.form);
    const responseFormData = useSelector((store: RootState) => store.state.responseFormData);

    return (
        <div className="bg-slate-100 h-full mt-3">
            <div className="pb-7 m-auto w-45p">
                {/* Title, Description */}
                <div className="question_title_section border-light rounded-lg">
                    <div className="bg-white border-t-8 border-t-purple-800 rounded-lg pb-5 pt-3 px-6 capitalize">
                        <h1 className="text-2xl font-semibold">{formData.title}</h1>
                        <p className="text-base mt-2">{formData.description}</p>
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
                                    value={responseFormData[index]}
                                    onChange={(e) => props.handleFormData(field.type, index, e.target.value)}
                                />

                                : field.type === 'paragraph' ?
                                    <textarea placeholder="Your answer"
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
                                        <div>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue={0}
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
                                                                onChange={(e) => props.handleFormData(field.type, index, e.target.checked, i)}
                                                                checked={responseFormData[index]?.includes(i) || false}
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

                <div className="flex justify-between">
                    <button onClick={() => props.submitResponse()} className="px-5 py-2  bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg">Submit</button>
                    <button className="px-2 py-1  text-purple-800 text-sm rounded-md font-semibold hover:bg-slate-200">Clear form</button>
                </div>

            </div>
        </div>
    )
}

export default ResponseForm