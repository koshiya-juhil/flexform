import ResponseView from "./ResponseView"

interface ResponseTabProps {
  handleUpdateForm: () => void;
}

function ResponseTab(props: ResponseTabProps) {
  return (
    <ResponseView 
      handleUpdateForm={props.handleUpdateForm}
    />
  )
}

export default ResponseTab