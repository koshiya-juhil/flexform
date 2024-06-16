import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../config/Types";

const initialState: AppState = {
  data: [],
  fieldOrder: [],
  pageName: "",

  // Secret Keys
  REACT_APP_SECRETKEY: "",
  REACT_APP_KEY: "",
  REACT_APP_ISSUER: "website",
  REACT_APP_PLATFORM: 1,
  REACT_APP_METHOD_GET: "GET",
  REACT_APP_METHOD_POST: "POST",
  REACT_APP_METHOD_DEL: "DELETE",
  REACT_APP_REQ_LIST: "",
  REACT_APP_REQ_ADD: "add",
  REACT_APP_REQ_UPDATE: "update",
  REACT_APP_REQ_DELETE: "delete",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProps(state, action: PayloadAction<Partial<AppState>>) {
      state.pageName = action.payload.pageName ?? state.pageName;
      state.data = action.payload.data
        ? state.data.concat(action.payload.data)
        : state.data;
    },
    clearData(state) {
      state.data = [];
    },
    // updateData(
    //   state,
    //   action: PayloadAction<{ data?: any[]; envdata?: any[] }>
    // ) {
    //   state.data = action.payload.data ?? state.data;
    //   state.envdata = action.payload.envdata ?? state.envdata;
    // },
    
    // setCookiesData(state, action: PayloadAction<{ cookiesData: any[] }>) {
    //   state.cookiesData = action.payload.cookiesData;
    // },
    // setLocalStorageData(
    //   state,
    //   action: PayloadAction<{ localStorageData: any[] }>
    // ) {
    //   state.localStorageData = action.payload.localStorageData;
    // },
  },
});

export const {
  setProps,
  clearData,
//   updateData,
//   setCookiesData,
//   setLocalStorageData,
} = appSlice.actions;

export default appSlice.reducer;
