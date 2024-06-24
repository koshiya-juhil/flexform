import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Form } from "../config/Types";

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
  paymentDetails: {
    title: '',
    stripe_publishable_key: '',
    stripe_secret_key: '',
    currency: '',
    price: 0
  },
  createdBy: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm(_, action: PayloadAction<Form>) {
      return action.payload;
    },
    clearPaymentDetail(state){
      state.paymentDetails = initialState.paymentDetails;
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
  clearPaymentDetail,
  // updateForm,
  // addFormField,
  // updateFormField,
  // removeFormField,
} = formSlice.actions;

export default formSlice.reducer;
