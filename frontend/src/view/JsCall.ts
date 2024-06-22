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
        index?: number,
        formname?: string,
        showerror: boolean = true
    ): boolean {
        let hasError: boolean = false;
        let errText = '';
        
        if (index !== undefined) {
            let value = formData[index];
            const validation = validations[index];

            if (validation.type === 'text' || validation.type === 'paragraph') {
                try {
                    value = value.toString();
                    // hasError = !value.match(new RegExp(validation.regex ?? ''))
                    //     || (validation.minValue !== undefined && parseFloat(value) < validation.minValue)
                    //     || (validation.maxValue !== undefined && parseFloat(value) > validation.maxValue)
                    //     || (validation.minLength !== undefined && value.length < validation.minLength)
                    //     || (validation.maxLength !== undefined && value.length > validation.maxLength);
                } catch (error) {
                    hasError = true;
                }
            }
            else if(validation.type === 'radio'){
                if(value < 0){
                    hasError = true;
                    errText = "This is required question"
                }
            } 
            else if(validation.type === 'checkbox'){
                if(value.length === 0){
                    hasError = true;
                    errText = "This is required question";
                }
            }
            else {
                hasError = false;
            }

            hasError ||= (!value && validation.required);
            hasError &&= (value || validation.required);

            const element = document.getElementById(`${formname ? formname : 'form'}-${index}`);
            if (element) {
                if (showerror) {
                    if(!value && validation.required){
                        errText = "This is required question"
                    }

                    this.handleError(`${formname ? formname : 'form'}-${index}`, hasError, errText);
                }
            } else {
                hasError = false;
            }

            return hasError;
        } else {
            hasError = false;

            validations.forEach((_, i) => {
                const tempHasError = this.validateForm(formData, validations, i, formname, showerror);
                hasError ||= tempHasError;
            });

            return hasError;
        }
    }

}