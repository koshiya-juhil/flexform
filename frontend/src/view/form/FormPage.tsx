import QuestionFormController from '../../Controller/QuestionFormController'


const FormPage = () => {
    
    const mode = window.location.pathname.split('/')[2];

    console.log("mode", mode);

    return (
        <>
            <QuestionFormController pagename="form" mode={mode} />
        </>
    )
}

export default FormPage;