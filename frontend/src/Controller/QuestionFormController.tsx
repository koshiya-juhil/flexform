// import { useParams } from 'react-router-dom'
import QuestionFormView from '../view/form/QuestionFormView'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearForm, setForm } from '../redux/formSlice';
import { Form, Value } from '../config/Types';
import { Config, IISMethods, JsCall } from '../config/IISMethods';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { clearData, setState } from '../redux/stateSlice';
// import { FormField } from '../view/MastersJson';

interface QuestionFormControllerProps {
  pagename: string,
  mode: string,
}

function QuestionFormController(props: QuestionFormControllerProps) {

  const navigate = useNavigate();

  const form: Form = useSelector((store: RootState) => store.form);
  const state = useSelector((store: RootState) => store.state);
  const dispatch = useDispatch();

  const params = useParams();

  const { formId } = params;

  useEffect(() => {
    // dispatch(clearForm());
    // dispatch(clearData('formResponses'))

    return () => {
      dispatch(clearForm());
      dispatch(clearData('formResponses'))
    }

  }, [])


  useEffect(() => {
    if (formId != undefined && formId?.length && form._id != formId) {
      getFormById();
    }

  }, [formId])

  async function getFormById() {
    const url = Config.serverUrl + 'form' + '/' + formId;

    await IISMethods.axiosRequest('get', url, {}, {}, SuccessCallback, ErrorCallback);

    function SuccessCallback(res: AxiosResponse): void {
      dispatch(setForm(res.data.response));
    }

    function ErrorCallback(err: AxiosError | Error): void {
      console.log(err);
    }
  }

  const setPaymentFormData = () => {
    // temporary comment
    // const tempPaymentFormMasterJson = IISMethods.getCopy(state.paymentFormMasterJson);
    // tempPaymentFormMasterJson.formfields.forEach((fieldObj : FormField) => {
    //   if(fieldObj.dependentrequired){
    //     fieldObj.dependentrequired.fields.forEach((field: string) => {
    //       const index = IISMethods.getindexfromarray(tempPaymentFormMasterJson.formfields, 'field', field);
    //       if(index != -1){
    //         const val = form.paymentDetails[fieldObj.dependentrequired.onvalue];
    //         tempPaymentFormMasterJson.formfields[index].required = val === fieldObj.dependentrequired.onvalue ? true : false;
    //       }
    //     })
    //   }
    // })

    // dispatch(setState({ paymentFormMasterJson: tempPaymentFormMasterJson }));
  }

  const handleForm: (key: string, value: Value, key2?: string) => void = (key, value, key2 = '') => {
    const temp = JSON.parse(JSON.stringify(form));

    if (key === 'title' || key === 'description') {
      temp[key] = value;
    }
    else if (key === 'paymentDetails') {
      temp[key][key2] = value;

      const tempPaymentFormMasterJson = state.paymentFormMasterJson;
      const fieldObj = IISMethods.getobjectfromarray(tempPaymentFormMasterJson.formfields, 'field', key2);
      if (fieldObj.dependentrequired) {
        fieldObj.dependentrequired.fields.map((field: string) => {
          const index = IISMethods.getindexfromarray(tempPaymentFormMasterJson.formfields, 'field', field);
          if(index != -1){
            tempPaymentFormMasterJson.formfields[index].required = value === fieldObj.dependentrequired.onvalue ? true : false;
          }
        })
        dispatch(setState({ paymentFormMasterJson: tempPaymentFormMasterJson }));
      }

      JsCall.validateForm(temp[key], state.paymentFormMasterJson.formfields, key2, 'payment', true);

    }

    dispatch(setForm(temp));
  }

  const handleField: (key: string, value: Value, index: number, action?: string, optionIndex?: number) => void = (key = '', value = '', index, action = '', optionIndex) => {
    const temp = JSON.parse(JSON.stringify(form));

    if (key === 'add-new-field') {
      temp.formfields.push({
        id: '',
        text: `Question${index + 1}`,
        type: 'text',
        open: false,
        disabled: false,
        defaultvisibility: true,
        required: false,
        options: [],
      })
    }
    else if (key === 'field' && action === 'duplicate') {
      const field = temp.formfields.slice(index, index + 1)[0];
      temp.formfields.splice(index, 0, field);
    }
    else if (key === 'field' && action === 'delete') {
      temp.formfields.splice(index, 1);
    }
    else if (key === 'type' && (value === 'radio' || value === 'checkbox')) {
      temp.formfields[index][key] = value;
      temp.formfields[index].options = [{ label: "Option" + 1 }];
    }
    else if (key === 'options') {
      if (action === 'add-new') {
        temp.formfields[index].options.push({ label: 'Option' + (temp.formfields[index].options.length + 1) });
      }
      else if (action === 'remove') {
        temp.formfields[index].options.splice(optionIndex, 1);
      }
      else if (action === 'edit') {
        temp.formfields[index].options[Number(optionIndex)].label = value;
      }
    }
    else {
      temp.formfields[index][key] = value;
    }

    dispatch(setForm(temp));
  }

  const handleSave = () => {

    if (JsCall.validateForm(form.paymentDetails, state.paymentFormMasterJson.formfields, undefined, 'payment', true)) {
      IISMethods.localnotify("Fill all required data", 2);
      return;
    }

    const url = Config.serverUrl + props.pagename + '/add';
    const reqData = IISMethods.getCopy(form);

    IISMethods.axiosRequest('post', url, reqData, {}, addSuccessCallback, addErrorCallback);

    function addSuccessCallback(res: AxiosResponse): void {
      dispatch(setForm(res.data.response));

      navigate(`/form/edit/${res.data.response._id}`, { replace: true })
    }

    function addErrorCallback(err: AxiosError | Error): void {
      console.log(err);
    }

  }

  const handleUpdate = () => {

    console.log('form',form.paymentDetails)

    console.log(JsCall.validateForm(form.paymentDetails, state.paymentFormMasterJson.formfields, undefined, 'payment', true))

    if (JsCall.validateForm(form.paymentDetails, state.paymentFormMasterJson.formfields, undefined, 'payment', true)) {
      IISMethods.localnotify("Fill all required data", 2);
      return;
    }

    const url = Config.serverUrl + props.pagename + '/update';
    const reqData = IISMethods.getCopy(form);

    IISMethods.axiosRequest('put', url, reqData, {}, SuccessCallback, ErrorCallback)

    function SuccessCallback(res: AxiosResponse): void {
      dispatch(setForm(res.data.response));
    }

    function ErrorCallback(err: AxiosError | Error): void {
      console.log(err);
    }
  }

  // const handleDelete = (formid: string) => {
  //   const url = Config.serverUrl + props.pagename + '/' + formid;

  //   IISMethods.axiosRequest('delete', url, {}, {}, successCallback, errorCallback);

  //   function successCallback(res: AxiosResponse){
  //     console.log("res.data", res.data);
  //   }

  //   function errorCallback(error: AxiosError | Error){
  //     console.log(error);
  //   }
  // }

  return (
    <>
      <QuestionFormView
        handleForm={handleForm}
        handleField={handleField}
        handleSave={handleSave}
        handleUpdate={handleUpdate}
        formData={form}
        mode={props.mode}
        setPaymentFormData={setPaymentFormData}
      />
    </>
  )
}

export default QuestionFormController