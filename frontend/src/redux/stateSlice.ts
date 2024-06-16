import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GenericStateType } from "../config/Types";

const initialState: GenericStateType = {
    responseFormData: {},
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        setState(state, action: PayloadAction<GenericStateType>){
            return {
                ...state,
                ...action.payload
            };
        },
        clearData(state, action: PayloadAction<keyof GenericStateType>){
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