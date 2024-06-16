import { AddCircleOutline, CheckBox, Close, CropOriginal, DeleteOutline, FilterNone, MoreVert, OndemandVideo, Radio, ShortText, Subject, TextFields } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControlLabel, IconButton, MenuItem, Select, Switch, Typography } from "@mui/material";
import { useState } from "react"

function QuestionsForm2() {
    const [formFields, setFormFields] = useState([
        {
            'field': 'default',
            'text': 'Which is the capital city of karnataka?',
            'type': 'radio',
            'open': true,
            'disabled': false,
            'defaultvisibility': true,
            'required': false,
            'gridsize': 'col-12',
            'options': [
                {
                    'label': 'Bengaluru',
                    'value': 'bengaluru'
                }, {
                    'label': 'Chennai',
                    'value': 'chennai'
                }, {
                    'label': 'Surat',
                    'value': 'surat'
                }, {
                    'label': 'Delhi',
                    'value': 'delhi'
                }
            ]
        }
    ]);

    function changeQuestion(value: string, index: number){
        const newQuestion = JSON.parse(JSON.stringify(formFields));
        newQuestion[index].text = value;
        setFormFields(newQuestion);
    }

    function changeOptionValue(text: string, i: number, j: number){
        const newQuestions = JSON.parse(JSON.stringify(formFields));
        newQuestions[i].options[j].label = text;
        setFormFields(newQuestions);
    }

    function removeOption(i: number, j: number){
        const newFormFields = JSON.parse(JSON.stringify(formFields));
        if(newFormFields[i].options.length > 1){
            newFormFields[i].options.splice(j, 1);
            setFormFields(newFormFields);
        }
    }

    function addOption(i: number){
        const newFormFields = JSON.parse(JSON.stringify(formFields));
        if(newFormFields[i].options.length < 5){
            newFormFields[i].options.push({'label': "Option"+newFormFields[i].options.length+1})
            setFormFields(newFormFields);
        }
        else {
            alert("Max 5 options");
        }
    }

    function copyQuestion(i: number){
        const newQuestion = formFields[i];
        setFormFields([...formFields, newQuestion]);
    }

    function deleteQuestion(i: number){
        const newQuestions = JSON.parse(JSON.stringify(formFields));
        if(newQuestions.length > 1){
            newQuestions.splice(i,1);
            setFormFields(newQuestions);
        }
    }

    function requiredQuestion(i: number){
        const newQuestions = JSON.parse(JSON.stringify(formFields));
        newQuestions[i].required = !newQuestions[i].required;
        setFormFields(newQuestions);
    }

    function addMoreQuestionField() {
        setFormFields([...formFields, {
            'field': 'default',
            'text': 'Question',
            'type': 'radio',
            'open': true,
            'disabled': false,
            'defaultvisibility': true,
            'required': false,
            'gridsize': 'col-12',
            'options': [
                {
                    'label': 'Option 1',
                    'value': 'option1'
                },
            ]
        }])
    }

    function addQuestionType(index: number, type: string){
        const newFormFields = JSON.parse(JSON.stringify(formFields));
        newFormFields[index].type = type;
        setFormFields(newFormFields);
    }

    function QuestionsUI() {
        return formFields.map((formfield, i) => (
            <Accordion expanded={formfield.open} className={formfield.open ? 'add_border' : ''}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="w-full"
                    // elevation={1}
                >
                    {
                        formfield.open ? (
                            <div className="saved_questions">
                                <Typography className="text-sm font-normal tracking-wide pb-2 leading-6">{i+1}. {formfield.text}</Typography>
                                {
                                    formfield.options.map((op, j) => (
                                        <div key={j}>
                                            <div className="flex">
                                                <FormControlLabel 
                                                    className="ml-1.5 mb-1.5" 
                                                    disabled  
                                                    control={<input type={formfield.type} color="primary" className="mr-1" required={formfield.required} />}
                                                    label={
                                                        <Typography className="font-roboto text-sm font-normal tracking-wider leading-5 text-slate-800">
                                                            {op.label}
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                        : (
                            <></>
                        )
                    }
                </AccordionSummary>

                <div className="question_boxes** flex flex-row justify-center">
                    <AccordionDetails className="add_question** bg-white rounded-lg py-6 px-6 capitalize flex flex-col pt-0 w-11/12 ml-2.5">
                        <div className="add_question_top** flex flex-row items-center justify-between">
                            <input type="text" placeholder="Question" value={formfield.text} onChange={(e) => changeQuestion(e.target.value, i)} className="question box-border mt-2.5 font-google-sans text-sm font-normal flex-1 leading-10 w-2/5 border-none outline-none text-black h-10 mr-2.5 p-2.5" />
                            <CropOriginal style={{color: "#5f6368"}} />
                            <Select className="select h-10 py-1 px-4 text-black mx-2.5 bg-transparent text-sm" style={{color: "#5f6368"}}>
                                <MenuItem id="text" value="Text" onClick={() => addQuestionType(i, "text")} > <Subject className="mr-2.5" /> Paragraph</MenuItem>
                                {/* <MenuItem id="checkbox" value="Checkbox"><CheckBox className="mr-2.5" style={{color: "#70757a"}} checked /></MenuItem> */}
                                <MenuItem id="checkbox" value="Checkbox" onClick={() => addQuestionType(i, "checkbox")} ><CheckBox className="mr-2.5" style={{color: "#70757a"}} />Checkboxes</MenuItem>
                                <MenuItem id="radio" value="Radio" onClick={() => addQuestionType(i, "radio")} ><Radio className="mr-2.5" style={{color: "#70757a"}} />Multiple Choice</MenuItem>
                            </Select>
                        </div>
                        {formfield.options.map((op, j) => (
                            <div className="add_question_body** flex items-center" key={j}>
                                {
                                    (formfield.type != "text") ?
                                    <input type={formfield.type} className="mr-2.5" /> :
                                    <ShortText className="mr-2.5" />
                                }
                                <div>
                                    <input  type="text" placeholder="option" value={op.label} onChange={(e) => changeOptionValue(e.target.value, i, j)} className="text_input outline-none border-none h-10 font-roboto text-sm font-normal tracking-wider" />
                                </div>
                                <CropOriginal style={{color: "#5f3638"}} />
                                <IconButton aria-label="delete"> 
                                    <Close onClick={() => removeOption(i, j)} /> 
                                </IconButton>
                            </div>
                        ))}

                        {formfield.options.length < 5 ? (
                            <div className="add_question_body** flex items-center">
                                <FormControlLabel
                                    disabled
                                    control={
                                        (formfield.type != "text") ?
                                        <input type={formfield.type} color="primary" aria-label="secondary checkbox" className="mx-2.5" disabled/> : 
                                        <ShortText className="mr-2.5" />
                                    }
                                    label={
                                        <div>
                                            <input type="text" className="text_input text-sm w-14" placeholder="Add other" />
                                            <Button size="small" onClick={() => addOption(i)} className="normal-case text-sm font-semibold" style={{color: "#4285f4"}}>Add Option</Button>
                                        </div>
                                    }
                                />
                            </div>
                        ): ""}

                        <div className="add_footer">
                            <div className="add_question_bottom_left">
                                <Button size="small" className="normal-case text-sm font-semibold" style={{color: "#4285f4"}}> Answer key</Button>
                            </div>
                            <div className="add_question_bottom">
                                <IconButton aria-label="Copy" onClick={() => copyQuestion(i)}><FilterNone /></IconButton>
                                <IconButton aria-label="delete" onClick={() => deleteQuestion(i)}><DeleteOutline /></IconButton>
                                <span style={{color: "#5f6368"}} className="text-sm">Required</span> 
                                <Switch name="checkedA" color="primary" checked={formfield.required} onClick={() => requiredQuestion(i)} />
                                <IconButton><MoreVert/></IconButton>
                            </div>
                        </div>

                    </AccordionDetails>

                    <div className="question_edit** bg-slate-100 flex flex-col mr-3 mt-2.5 mb-0 p-px rounded-sm h-44 w-9">
                        <AddCircleOutline onClick={addMoreQuestionField} className="edit_icon" />
                        <OndemandVideo className="edit_icon" />
                        <CropOriginal className="edit_icon" />
                        <TextFields className="edit_icon" />
                    </div>

                </div>

            </Accordion>
        ))
        
    }

    return (
        <div>
            <div className="question_form* bg-slate-100 h-full pb-7">
                <br />
                <div className="section* m-auto w-1/2">
                    <div className="question_title_section">
                        <div className="question_form_top* bg-white border-t-8 border-t-purple-800 rounded-lg py-7 px-6 capitalize">
                            <input type="text" className="question_form_top_name* box-border text-3xl font-normal leading-10 w-full border-none outline-none border-b-slate-100 text-black h-9" placeholder="Untitled form" />
                            <input type="text" className="question_form_top_desc* box-border mt-2.5 text-sm font-normal leading-10 w-full border-none outline-none border-b-slate-100 text-black h-5" placeholder="Form Description" />
                        </div>
                    </div>
                    {QuestionsUI()}
                </div>
            </div>
        </div>
    )
}

export default QuestionsForm2