// import { useParams } from 'react-router-dom'
import QuestionFormView from '../view/form/QuestionFormView'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setForm } from '../redux/formSlice';
import { Form, Value } from '../config/Types';
import { Config, IISMethods } from '../config/IISMethods';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

interface QuestionFormControllerProps {
  pagename: string,
  mode: string,
}

function QuestionFormController(props: QuestionFormControllerProps) {

  const navigate = useNavigate();

  // const params = useParams();
  // console.log("params", params);

  const form: Form = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  // console.log("form", form);

  const handleForm: (key: string, value: Value) => void = (key, value) => {
    const temp = JSON.parse(JSON.stringify(form));

    if (key == 'title' || key == 'description') {
      temp[key] = value;
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
    const url = Config.webUrl + props.pagename + '/add';
    const reqData = IISMethods.getCopy(form);

    IISMethods.axiosRequest('post', url, reqData, {}, addSuccessCallback, addErrorCallback);

    function addSuccessCallback(res: AxiosResponse): void {
      console.log(res.data);
      dispatch(setForm(res.data));

      console.log("form", form);
      navigate(`/form/edit/${res.data._id}`)
    }

    function addErrorCallback(err: AxiosError | Error): void {
      console.log(err);
    }

  }

  const handleUpdate = () => {
    const url = Config.webUrl + props.pagename + '/update';
    const reqData = IISMethods.getCopy(form);

    IISMethods.axiosRequest('put', url, reqData, {}, SuccessCallback, ErrorCallback)

    function SuccessCallback(res: AxiosResponse): void {
      console.log(res.data);
      dispatch(setForm(res.data));

      console.log("form", form);
    }

    function ErrorCallback(err: AxiosError | Error): void {
      console.log(err);
    }
  }

  return (
    <>
      <QuestionFormView
        handleForm={handleForm}
        handleField={handleField}
        handleSave={handleSave}
        handleUpdate={handleUpdate}
        formData={form}
        mode={props.mode}
      />
    </>
  )
}

export default QuestionFormController