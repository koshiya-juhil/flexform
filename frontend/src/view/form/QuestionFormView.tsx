import { Form, Value } from "../../config/Types";
import FormHeader from "../components/FormHeader"
import HeaderTabs from "../components/HeaderTabs"
import QuestionForm from "./QuestionForm"

interface QuestionFormViewProps {
  handleForm: (key: string, value: Value) => void;
  handleField: (key: string, value: Value, index: number, action?: string, optionIndex?: number) => void;
  handleSave: () => void;
  handleUpdate: () => void;
  formData: Form;
  mode: string;
}

function QuestionFormView(props: QuestionFormViewProps) {
  return (
    <>
      <FormHeader 
        formData={props.formData}
      />
      <HeaderTabs />
      <QuestionForm
        handleForm={props.handleForm}
        handleField={props.handleField}
        handleSave={props.handleSave}
        handleUpdate={props.handleUpdate}
        mode={props.mode}
      />
    </>
  )
}

export default QuestionFormView