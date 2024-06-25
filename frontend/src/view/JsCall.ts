import { IISMethods } from "../config/IISMethods";
import { FormField, anyValue } from "../config/Types";

// interface FormFieldValidation {
//     type: string;
//     regex?: string;
//     minValue?: number;
//     maxValue?: number;
//     minLength?: number;
//     maxLength?: number;
//     required?: boolean;
// }

// interface FormValidation {
//     formfields: FormFieldValidation[];
// }

type FormData = Record<string, anyValue>;


export default class JsCall {

    handleError(id: string, hasError: boolean, errText: string) {
        let element = document.getElementById(id);

        console.log('element', element);
        // console.log('hasError', hasError);
        
        if(element){
            try {
                while(!element.classList.contains('form-group')){
                    element = element?.parentNode as HTMLElement;
                }
            } catch (error) {
                console.log(error);
            }

            if(hasError){
                element?.classList.add('error');
            }
            else {
                element?.classList.remove('error');
            }
        }

        const errElement: HTMLElement | null = document.getElementById(`${id}-errortext`);
        if(errElement){
            errElement.innerHTML = errText ? errText : '';
        }

    }
    
    validateForm(
        formData: FormData,
        validations: FormField[],
        key?: string | number,
        formname?: string,
        showerror: boolean = true
    ): boolean {
        let hasError: boolean = false;
        let errText = '';
        
        if (key !== undefined && key != -1) {
            let value = formData[key];
            let validation;

            if(typeof key === 'number'){
                validation = validations[Number(key)];
            }
            else {
                validation = IISMethods.getobjectfromarray(validations, 'field', key);
            }

            console.log('value', value);
            console.log('validation', validation);

            if (validation.type === 'text' || validation.type === 'paragraph' || validation.type === 'number') {
                try {
                    value = value.toString();
                    hasError = !value?.match(new RegExp(validation.regex ?? ''))
                        || (validation.minvalue !== undefined && parseFloat(value) < validation.minvalue)
                        || (validation.maxvalue !== undefined && parseFloat(value) > validation.maxvalue)
                        || (validation.minlength !== undefined && value?.length < validation.minlength)
                        || (validation.maxlength !== undefined && value?.length > validation.maxlength);
                } catch (error) {
                    hasError = true;
                }
            }
            else if(validation.type === 'radio'){
                if(value < 0){
                    hasError = true;
                    errText = "This is required field"
                }
            } 
            else if(validation.type === 'checkbox'){
                if(value?.length === 0){
                    hasError = true;
                    errText = "This is required field";
                }
            }
            else {
                hasError = false;
            }

            console.log('hasError', hasError);

            hasError ||= (!value && validation.required);
            hasError &&= (value || validation.required);

            const element = document.getElementById(`${formname ? formname : 'form'}-${key}`);
            if (element) {
                if (showerror) {
                    if(!value && validation.required){
                        errText = "This is required field"
                    }

                    this.handleError(`${formname ? formname : 'form'}-${key}`, hasError, errText);
                }
            } else {
                hasError = false;
            }

            return hasError;
        } else {
            hasError = false;

            validations.forEach((fields: FormField, i) => {
                const tempKey = typeof key === 'number' ? i : fields.field;
                const tempHasError = this.validateForm(formData, validations, tempKey, formname, showerror);
                hasError ||= tempHasError;
            });

            return hasError;
        }
    }

}