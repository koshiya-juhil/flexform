import { useState } from "react";
import { Form, Value, formtab } from "../../config/Types";
import FormHeader from "../components/FormHeader"
import HeaderTabs from "../components/HeaderTabs"
import QuestionForm from "./QuestionForm"
import ResponseTabController from "../../Controller/ResponseTabController";

interface QuestionFormViewProps {
  handleForm: (key: string, value: Value) => void;
  handleField: (key: string, value: Value, index: number, action?: string, optionIndex?: number) => void;
  handleSave: () => void;
  handleUpdate: () => void;
  formData: Form;
  mode: string;
}

function QuestionFormView(props: QuestionFormViewProps) {

  const [formTab, setFormTab] = useState<formtab>('questions');

  return (
    <>
      <FormHeader 
        formData={props.formData}
      />

      <HeaderTabs 
        formTab={formTab}
        setFormTab={setFormTab}
      />

      {
        formTab === 'questions' ?
          <QuestionForm
            handleForm={props.handleForm}
            handleField={props.handleField}
            handleSave={props.handleSave}
            handleUpdate={props.handleUpdate}
            mode={props.mode}
          />
        : 
          <ResponseTabController />
      }
    </>
  )
}

export default QuestionFormView