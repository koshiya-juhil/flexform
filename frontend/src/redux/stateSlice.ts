import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GenericObjectType } from "../config/Types";

const initialState: GenericObjectType = {
    responseFormData: {},
    myForms: [],
    formResponses: [],
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        setState(state, action: PayloadAction<GenericObjectType>){
            return {
                ...state,
                ...action.payload
            };
        },
        clearData(state, action: PayloadAction<keyof GenericObjectType>){
            state[action.payload] = Array.isArray(state[action.payload]) ? [] : {}
        }
        // clearData(state, action: PayloadAction<string[]>){
        //     action.payload.forEach(key => {
        //         if(state.hasOwnProperty(key)){
        //             state[key] = Array.isArray(state[key]) ? [] : {};
        //         }
        //     })
        // }
    }
})

export const { setState, clearData } = stateSlice.actions;

export default stateSlice.reducer;