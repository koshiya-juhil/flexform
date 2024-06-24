export type Value = string | number | boolean;

export type Option = { label: string; value?: string; _id?: string };

export type FormField = {
  [key: string]: anyValue;
  _id?: string;
  text: string;
  description?: string;
  type: string;
  disabled?: boolean;
  defaultvisibility?: boolean;
  required: boolean;
  options: Option[];
};

export interface Form {
  _id?: string;
  title: string;
  description: string;
  formfields: FormField[];
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  paymentDetails: Record<string, any>;
}

export interface AppState {
  data: any[];
  fieldOrder: any[];
  pageName: string;
  REACT_APP_SECRETKEY: string;
  REACT_APP_KEY: string;
  REACT_APP_ISSUER: string;
  REACT_APP_PLATFORM: number;
  REACT_APP_METHOD_GET: string;
  REACT_APP_METHOD_POST: string;
  REACT_APP_METHOD_DEL: string;
  REACT_APP_REQ_LIST: string;
  REACT_APP_REQ_ADD: string;
  REACT_APP_REQ_UPDATE: string;
  REACT_APP_REQ_DELETE: string;
  envdata?: any[];
  cookiesData?: any[];
  localStorageData?: any[];
  userRights?: any[];
}

export type GenericObjectType = { [key: string]: any };
// export type GenericObjectType<T> = { [key: string]: T };

export type GenericArray<T> = Array<T>;

export type State = Record<string, any>;

export type formtab = 'questions' | 'responses';

export type AnyArray = any[];
export type anyValue = any;