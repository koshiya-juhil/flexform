import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Form } from "../config/Types";

const initialState: Form = {
  title: "Untitled form",
  description: "",
  formfields: [{
    text: 'Question 1',
    description: '',
    type: 'text',
    required: false,
    options: [],
  }],
  createdBy: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm(state, action: PayloadAction<Form>) {
      return action.payload;
    },
    clearForm(){
      return initialState;
    }
    // updateForm(state, action: PayloadAction<Partial<Form>>) {
    //   Object.assign(state, action.payload);
    // },
    // addFormField(state, action: PayloadAction<FormField>) {
    //   state.formfields.push(action.payload);
    // },
    // updateFormField(
    //   state,
    //   action: PayloadAction<{ field: FormField; index: number }>
    // ) {
    //   if (action.payload.index !== -1) {
    //     state.formfields[action.payload.index] = action.payload.field;
    //   }
    // },
    // removeFormField(state, action: PayloadAction<string>) {
    //   state.formfields = state.formfields.filter(
    //     (field) => field.id !== action.payload
    //   );
    // },
  },
});

export const {
  setForm,
  clearForm,
  // updateForm,
  // addFormField,
  // updateFormField,
  // removeFormField,
} = formSlice.actions;

export default formSlice.reducer;
