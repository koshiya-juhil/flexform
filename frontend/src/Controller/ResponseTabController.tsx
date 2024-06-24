import { useParams } from "react-router-dom";
import ResponseTab from "../view/response/ResponseTab";
import { useEffect } from "react";
import { Config, IISMethods } from "../config/IISMethods";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../redux/stateSlice";
import { RootState } from "../redux/store";
import { setForm } from "../redux/formSlice";

function ResponseTabController() {

  const { formId } = useParams();
  const dispatch = useDispatch();
  const formData = useSelector((store: RootState) => store.form);

  useEffect(() => {

    if (formId != null && formId.length) {
      getFormResponse();
    }

  }, [formId])


  function getFormResponse() {
    const url = Config.serverUrl + 'form/response/' + formId;

    IISMethods.axiosRequest('get', url, {}, {}, SuccessCallback, ErrorCallback);

    function SuccessCallback(res: AxiosResponse) {
      dispatch(setState({ formResponses: res.data.responses }));
    }

    function ErrorCallback(error: AxiosError | Error) {
      console.log(error);
    }

  }

  function handleUpdateForm(){
    const url = Config.serverUrl + 'form' + '/update';
    const reqData = IISMethods.getCopy({...formData, isActive: !formData.isActive});

    IISMethods.axiosRequest('put', url, reqData, {}, SuccessCallback, ErrorCallback);

    function SuccessCallback(res: AxiosResponse): void {
      dispatch(setForm(res.data.response));
    }

    function ErrorCallback(err: AxiosError | Error): void {
      console.log(err);
    }

  }

  return (
    <ResponseTab 
      handleUpdateForm={handleUpdateForm}
    />
  )
}

export default ResponseTabController