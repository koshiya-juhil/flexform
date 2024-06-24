import { useEffect } from 'react';
import QuestionFormController from '../../Controller/QuestionFormController'
import MastersJson from '../MastersJson';
import { useDispatch } from 'react-redux';
import { setState } from '../../redux/stateSlice';


const FormPage = () => {
    const dispatch = useDispatch();
    const mode = window.location.pathname.split('/')[2];

    useEffect(() => {
        const paymentDetails = new MastersJson('paymentDetails');
        dispatch(setState({ paymentFormMasterJson: paymentDetails }))
    }, [])

    return (
        <>
            <QuestionFormController pagename="form" mode={mode} />
        </>
    )
}

export default FormPage;