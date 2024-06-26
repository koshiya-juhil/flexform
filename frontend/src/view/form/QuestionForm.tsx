import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, FormControlLabel, IconButton, InputLabel, Menu, MenuItem, Select, Switch } from "@mui/material";
import { AddCircle, Check, CheckBox, Close, DeleteOutline, FilterNone, MoreVert, RadioButtonChecked, ShortText, Subject } from "@mui/icons-material";
import { Value } from "../../config/Types";
import { PurpleSwitch } from "../components/styleComponents";
import { FormField } from "../MastersJson";
import { clearPaymentDetail } from "../../redux/formSlice";

interface QuestionFormProps {
    handleForm: (key: string, value: Value, key2?: string) => void;
    handleField: (key: string, value: Value, index: number, action?: string, optionIndex?: number) => void;
    handleSave: () => void;
    handleUpdate: () => void;
    setPaymentFormData: () => void;
    mode: string;
}

type optionValue = 'description' | 'validation';
type optionObject = {
    label: string;
    value: optionValue;
}
type questionOption = optionObject[];

const options: questionOption = [
    {
        label: "Description",
        value: "description"
    },
    {
        label: "Validate Response",
        value: "validation"
    }
]

function QuestionForm(props: QuestionFormProps) {
    const dispatch = useDispatch();
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // for open question footer dropdown
    const [questionOptions, setQuestionOptions] = useState<optionValue[]>([]);

    const form = useSelector((store: RootState) => store.form);
    const state = useSelector((store: RootState) => store.state);
    const paymentDetailsMasterJson: {formfields: FormField[]} = state.paymentFormMasterJson;
    const [acceptPayment, setAcceptPayment] = useState<boolean>(form.paymentDetails.price ? true : false);

    function handleOpenQuestion(index: number) {
        if (openQuestion == index) {
            setOpenQuestion(-1);
        }
        else {
            setOpenQuestion(index);
        }
    }

    // Question Footer Dropdown
    const open = Boolean(anchorEl);
    const handleClickQuestionOptions = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseQuestionOptions = () => {
        setAnchorEl(null);
    };

    const handleQuestionOptions: (value: optionValue, fieldIndex?: number) => void = (value, fieldIndex) => {
        let copyOptions = [...questionOptions];
        if (copyOptions.includes(value)) {
            copyOptions = copyOptions.filter(i => i != value);

            if (value === 'description') {
                props.handleField('description', '', Number(fieldIndex));
            }
        }
        else {
            copyOptions.push(value);
        }
        setQuestionOptions(copyOptions);
        handleCloseQuestionOptions();
    }

    return (
        <div>
            <div className="question_form* bg-slate-100 h-full pb-7">
                <br />
                <div className="section* m-auto w-1/2">

                    {/* Title, Description */}
                    <div className="question_title_section">
                        <div className="question_form_top* bg-white border-t-8 border-t-purple-800 rounded-lg py-7 px-6 capitalize">
                            <input type="text" placeholder="Untitled form" className="question_form_top_name* box-border text-3xl font-normal leading-10 w-full border-none outline-none border-b-slate-100 text-black h-9"
                                value={form.title}
                                onChange={(e) => props.handleForm('title', e.target.value)}
                            />
                            <textarea placeholder="Form Description" className="box-border mt-2.5 text-sm font-normal leading-6 w-full border-none outline-none resize-none overflow-hidden border-b-slate-100 text-black h-5"
                                value={form.description}
                                onChange={(e) => props.handleForm('description', e.target.value)}
                                onInput={(e) => {
                                    e.currentTarget.style.height = '';
                                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                                }}
                            />
                        </div>
                    </div>

                    {/* Questions : Form Fields */}
                    {form.formfields?.map((formfield, index) => (
                        <Accordion key={index} expanded={openQuestion === index} className={`my-2 !rounded ${openQuestion === index ? 'add_border' : ''}`}>
                            <AccordionSummary onClick={() => handleOpenQuestion(index)} >
                                <div>
                                    <span className="mr-1">{index + 1}.</span>
                                    <span>{formfield.text}</span>
                                </div>
                            </AccordionSummary>

                            <div className="flex flex-row justify-between">
                                <AccordionDetails className="bg-white rounded-lg py-6 px-6 capitalize flex flex-col pt-0 w-full ml-2.5">

                                    {/* Question Header */}
                                    <div>
                                        <div className="flex flex-row items-center justify-between">
                                            <input type="text" placeholder="Question" className="bg-gray-100 pl-3 box-border text-base leading-10 w-full outline-none border-b-2 border-b-gray-600 h-12 focus:border-b-purple-800"
                                                value={formfield.text}
                                                onChange={(e) => props.handleField('text', e.target.value, index)}
                                            />
                                            <Select onChange={(e) => props.handleField('type', e.target.value, index)} value={formfield.type} className="select h-10 py-1 px-4 text-black mx-2.5 bg-transparent text-sm" style={{ color: "#5f6368" }}>
                                                <MenuItem id="text" value="text" > <ShortText className="mr-2.5" style={{ color: "#70757a" }} /> Text</MenuItem>
                                                <MenuItem id="paragraph" value="paragraph"> <Subject className="mr-2.5" style={{ color: "#70757a" }} /> Paragraph</MenuItem>
                                                <MenuItem id="radio" value="radio" ><RadioButtonChecked className="mr-2.5" style={{ color: "#70757a" }} />Multiple Choice</MenuItem>
                                                <MenuItem id="checkbox" value="checkbox"><CheckBox className="mr-2.5" style={{ color: "#70757a" }} />Checkboxes</MenuItem>
                                                {/* <MenuItem id="dropdown" value="dropdown"><ArrowDropDownCircleOutlined className="mr-2.5" style={{ color: "#70757a" }} />Dropdown</MenuItem> */}
                                            </Select>
                                        </div>

                                        {/* description */}
                                        {questionOptions.includes('description') ?
                                            <div className="mt-2">
                                                <input type="text" placeholder="Description" className="box-border text-base leading-10 w-full outline-none border-b-2 border-b-gray-600 h-9 focus:border-b-purple-800"
                                                    value={formfield?.description}
                                                    onChange={(e) => props.handleField('description', e.target.value, index)}
                                                />
                                            </div>
                                            : <></>}
                                    </div>

                                    {/* Options */}
                                    {formfield.type === 'radio' || formfield.type === 'checkbox' ?
                                        <div>
                                            {formfield.options?.map((option, j) => (
                                                <div className="add_question_body** flex items-center mt-2 mr-3 justify-between" key={j}>
                                                    <div>
                                                        <input type={formfield.type} className="mr-2.5" />
                                                        <input type="text" placeholder="option" value={option.label} onChange={(e) => props.handleField('options', e.target.value, index, 'edit', j)} className="text_input outline-none border-none h-10 text-base font-normal tracking-wider" />
                                                    </div>
                                                    {formfield.options?.length > 1 ?
                                                        <IconButton aria-label="delete">
                                                            <Close onClick={() => props.handleField('options', '', index, 'remove', j)} />
                                                        </IconButton>
                                                        : <></>}
                                                </div>
                                            ))}

                                            <div className="add_question_body** flex items-center">
                                                <FormControlLabel
                                                    disabled
                                                    control={
                                                        <input type={formfield.type} color="primary" aria-label="secondary checkbox" className="mx-2.5" disabled />
                                                    }
                                                    label={
                                                        <div>
                                                            <input type="text" onClick={() => props.handleField('options', '', index, 'add-new')} className="text_input text-sm w-15 outline-none" placeholder="Add Option" /> or
                                                            <Button size="small" onClick={() => { }} className="normal-case text-sm font-semibold" style={{ color: "#4285f4" }}>Add Other</Button>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        </div>
                                        : <></>
                                    }

                                    <br></br>
                                    {/* Question Footer */}
                                    <div className="add_footer">
                                        <div className="flex items-center justify-end">
                                            <IconButton aria-label="Copy" onClick={() => props.handleField('field', '', index, 'duplicate')}><FilterNone /></IconButton>
                                            {form.formfields.length > 1 ? <IconButton aria-label="delete" onClick={() => props.handleField('field', '', index, 'delete')}><DeleteOutline /></IconButton> : <></>}
                                            <span style={{ color: "#5f6368" }} className="text-sm">Required</span>
                                            <Switch onClick={() => props.handleField('required', !formfield.required, index)} name="checked" color="primary" checked={formfield.required} />

                                            <div>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClickQuestionOptions}
                                                ><MoreVert /></IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleCloseQuestionOptions}
                                                // PaperProps={{
                                                //     style: {
                                                //         // maxHeight: ITEM_HEIGHT * 4.5,
                                                //         width: '20ch',
                                                //     },
                                                // }}
                                                >
                                                    {options.map((option, i) => {
                                                        const selected = questionOptions.includes(option.value);
                                                        return (
                                                            <MenuItem key={i} selected={selected} onClick={() => handleQuestionOptions(option.value, index)} className={`${selected ? '!pl-0' : '!pl-8'}`}>
                                                                {selected && <Check className='mx-1' />}
                                                                {option.label}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Menu>
                                            </div>
                                        </div>
                                    </div>

                                </AccordionDetails>
                            </div>
                        </Accordion>
                    ))}

                    <div className="form-group rounded-lg flex flex-col w-full my-3">
                        <button className="px-5 py-2  bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg"
                            onClick={() => {
                                console.log("acceptPayment", acceptPayment);
                                if (acceptPayment) {
                                    dispatch(clearPaymentDetail());
                                }
                                props.setPaymentFormData();
                                setAcceptPayment(!acceptPayment)
                            }}
                        >
                            {acceptPayment ? 'Remove' : 'Accept'} payment
                        </button>
                    </div>

                    {/* payment method field */}
                    {acceptPayment ?
                        <div>
                            <Accordion className={`my-2 !rounded`} expanded={true}>
                                <AccordionSummary>
                                    <span className="font-semibold">Payment Details</span>
                                </AccordionSummary>

                                <div className="flex flex-row justify-between">
                                    <AccordionDetails className="bg-white rounded-lg py-6 px-6 capitalize flex flex-col pt-0 w-full ml-2.5">
                                        {paymentDetailsMasterJson.formfields.filter((formfield: FormField) => {
                                            try {
                                                return formfield.defaultvisibility || (formfield.condition && form.paymentDetails[formfield.condition?.field] === formfield.condition?.onvalue);
                                            } catch (error) {
                                                return false;
                                            }
                                        }).map((formfield: FormField, index: number) => (
                                            <div className="form-group my-3">
                                                {formfield.type === 'text' ?
                                                    <div>
                                                        <label>{formfield.text} {formfield.required ? <span className="text-red-700"> * </span> : <></>}</label>
                                                        <input type="text" key={index} placeholder={formfield.text} className="bg-gray-100 !text-black pl-3 box-border text-base leading-10 w-full outline-none border-b-2 border-b-gray-600 h-12 focus:border-b-purple-800"
                                                            id={`payment-${formfield.field}`}
                                                            value={form.paymentDetails[formfield.field] || ''}
                                                            onChange={(e) => props.handleForm('paymentDetails', e.target.value, formfield.field)}
                                                        />
                                                    </div>
                                                    : formfield.type === 'number' ?
                                                        <>
                                                            <div>
                                                                <label>{formfield.text} {formfield.required ? <span className="text-red-700"> * </span> : <></>}</label>
                                                                <input type="number" key={index} placeholder={formfield.text} className="bg-gray-100 !text-black pl-3 box-border text-base leading-10 w-full outline-none border-b-2 border-b-gray-600 h-12 focus:border-b-purple-800"
                                                                    id={`payment-${formfield.field}`}
                                                                    value={form.paymentDetails[formfield.field] || 0}
                                                                    onChange={(e) => props.handleForm('paymentDetails', e.target.value, formfield.field)}
                                                                />
                                                            </div>
                                                        </>
                                                        : formfield.type === 'dropdown' ?
                                                            <FormControl id={`payment-${formfield.field}`} variant="filled" sx={{ m: 1, minWidth: 120 }} className="!m-0 w-1/2">
                                                                <InputLabel id="demo-simple-select-filled-label">{formfield.text}</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-filled-label"
                                                                    id="demo-simple-select-filled"
                                                                    value={form.paymentDetails[formfield.field]}
                                                                    onChange={(e) => props.handleForm('paymentDetails', e.target.value, formfield.field)}
                                                                    label={formfield.text}
                                                                // label={<>{formfield.text} {formfield.required ? <span className="text-red-700"> * </span> : <></>}</>}
                                                                >
                                                                    {formfield.masterdata?.map((data: { text: string, value: string }, i: number) => (
                                                                        <MenuItem value={data.value} key={data.text+i}>{data.text}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                            : formfield.type === 'switch' ?
                                                                <div>
                                                                    <PurpleSwitch
                                                                        checked={form.paymentDetails[formfield.field]}
                                                                        onChange={(e) => props.handleForm('paymentDetails', e.target.checked, formfield.field)}
                                                                    />
                                                                    <span className="text-sm text-slate-600">{formfield.text}</span>
                                                                </div>
                                                                : <></>}
                                                <div
                                                    id={`payment-${formfield.field}-errortext`}
                                                    className="error-text text-xs"
                                                ></div>
                                            </div>
                                        ))}
                                    </AccordionDetails>
                                </div>
                            </Accordion>
                        </div>
                        : <></>}


                    <div className="mt-2 flex flex-row justify-between">
                        <button onClick={() => props.handleField('add-new-field', '', form.formfields.length)} className="text-purple-800 font-bold flex items-center gap-1"><AddCircle /> Add new question</button>
                        <button className="px-8 py-2  bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg"
                            onClick={() => { props.mode === 'edit' ? props.handleUpdate() : props.handleSave() }}
                        >{props.mode === 'edit' ? 'Update' : 'Create'}</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default QuestionForm