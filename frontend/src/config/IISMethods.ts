import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import _Config from "./Config";
import _JsCall from '../view/JsCall';
import { toast } from "react-toastify";
import { AnyArray, anyValue } from "./Types";
// import axiosInstance from './axiosInstance';

export const Config = new _Config();
export const JsCall = new _JsCall();

class _IISMethods {
  constructor() {}

  getPagename() {
    const url = window.location.pathname;
    const pagename = url.split("/");
    return pagename[pagename.length - 1];
  }

  // Local Storage Functions
  setLocalStorageData<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getLocalStorageData<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clearLocalStorageData(key: string) {
    localStorage.removeItem(key);
  }

  // Session Storage Functions
  setSessionStorageData<T>(key: string, value: T) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSessionStorageData<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clearSessionStorageData(key: string) {
    sessionStorage.removeItem(key);
  }

  // cookie functions

  /**
   * this function clears httpOnly cookie by sending request to backend server
   */
  clearCookie(key: string) {
    const url = Config.serverUrl + "clear-cookie";
    this.axiosRequest(
      "post",
      url,
      { cookieKey: key },
      {},
      successCallback,
      errorCallback
    );

    function successCallback(res: AxiosResponse): void {
      console.log(res.data);
    }

    function errorCallback(err: AxiosError | Error): void {
      console.log(err);
    }
  }

  // setCookieData(key: string, value: anyValue, path: string = '/'): void {
  //   try {
  //     const cookies = new Cookies();
  //     cookies.set(key, value, { path: path });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // getCookieData(key: string): anyValue {
  //   const cookies = new Cookies();
  //   return cookies.get(key);
  // }

  // clearCookieData(key: string, path: string = '/'): void {
  //   const cookies = new Cookies();
  //   cookies.remove(key, { path: path });
  // }

  // setCookieData(key: string, value: string, options?: object): void {
  //   document.cookie = `${key}=${value}; ${Object.entries(options || {}).map(([k, v]) => `${k}=${v}`).join('; ')}`;
  // }

  // getCookieData(key: string): string | undefined {
  //   const cookies = document.cookie.split(';');
  //   for (const cookie of cookies) {
  //     const [cookieKey, cookieValue] = cookie.trim().split('=');
  //     if (cookieKey === key) {
  //       return cookieValue;
  //     }
  //   }
  //   return undefined;
  // }

  // clearCookieData(key: string, options?: object): void {
  //   this.setCookieData(key, '', { ...options, expires: new Date(0) });
  // }

  //  object and array methods
  getCopy<T extends object>(element: T | T[]): T | T[] {
    try {
      if (Array.isArray(element)) {
        return element.map((o) => Object.assign({}, o));
      } else {
        return Object.assign({}, element);
      }
    } catch (error) {
      return Object.assign({}, element);
    }
  }

  /**
   * Finds an object in an array based on a specific key-value pair.
   * @returns {object | undefined} The object that matches the key-value pair, or undefined if not found.
   */
  getobjectfromarray(
    arr: AnyArray,
    key: string,
    value: anyValue
  ): anyValue | undefined {
    try {
      return arr.find((o) => o[key] == value);
    } catch (error) {
      return undefined;
    }
  }

  getindexfromarray(arr: AnyArray, key: string, value: anyValue): number {
    try {
      return arr.findIndex((o) => o[key] == value);
    } catch (error) {
      return -1;
    }
  }

  // date and time methods
  /**
   * Formats a given date into various string formats based on the specified format identifier.
   *
   * @param {Date | string} date - The date to format. Can be a Date object or a date string.
   * @param {number} format - The format identifier to determine the output format. Available formats:  1 => 'yyyy-MM-dd', 2 =>  'M/d/yyyy', 3 => 'M/d/yy', 4 => 'dd-MMM-yy', 5 => 'yy/MM/dd', 6 => 'MM/dd/yy', 7 => 'dd/MM/yyyy', 8 => 'MMM-yyyy',
   * @returns {string} The formatted date string according to the specified format. Returns "Invalid Date" if the date is invalid or if the format identifier is unrecognized.
   * @throws {Error} If the provided date is invalid.
   */
  getDateFormats(date: Date | string, format: number): string {
    const parseDate = (date: Date | string): Date => {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid Date");
      }
      return parsedDate;
    };

    const pad = (n: number): string => n.toString().padStart(2, "0");

    try {
      date = date.toString();
      const dateobj = parseDate(date);
      const year = dateobj.getFullYear(); // 2024
      const month = dateobj.getMonth() + 1; // 9
      const day = dateobj.getDate(); // 1

      const yy = year.toString().slice(-2) || ""; // 24
      const mm = pad(month);
      const dd = pad(day);
      const shortMonth = dateobj.toLocaleString("default", { month: "short" }); // Sep

      switch (format) {
        case 1:
          return `${year}-${mm}-${dd}`; // 2024-09-01
        case 2:
          return `${month}/${day}/${year}`; // 9/1/2024
        case 3:
          return `${month}/${day}/${yy}`; // 9/1/24
        case 4:
          return `${dd}-${shortMonth}-${yy}`; // 01-Sep-24
        case 5:
          return `${yy}/${mm}/${dd}`; // 24/09/01
        case 6:
          return `${mm}/${dd}/${yy}`; // 09/01/24
        case 7:
          return `${dd}/${mm}/${year}`; // 01/09/2024
        case 8:
          return `${shortMonth}-${year}`; // Sep-2024
        default:
          return "Invalid Date Format";
      }
    } catch (error) {
      console.log("error", error);
      return "Invalid Date";
    }
  }

  async axiosRequest<T>(
    method: AxiosRequestConfig["method"],
    url: string,
    reqBody: T,
    reqHeaders: Record<string, string>,
    successCallback: (response: AxiosResponse) => void,
    errorCallback: (error: AxiosError | Error) => void
  ): Promise<void> {
    try {
      // const response = await axiosInstance({
      const response = await axios({
        method: method,
        url: url,
        data: reqBody,
        headers: reqHeaders,
        withCredentials: true,
      });

      if (response.data.notify) {
        IISMethods.localnotify(response.data.message, 1);
      }

      successCallback(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // !error?.response?.data.notify && IISMethods.localnotify("Login to continue.", 0);
          IISMethods.clearLocalStorageData("user");
          // window.location.href = '/login';
          // sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
          // redirect to login and after login redirect back
        }

        if (error?.response?.data.notify) {
          IISMethods.localnotify(error?.response.data.error, 0);
        }

        errorCallback(error);
      } else {
        // Handle non-Axios errors
        errorCallback(new Error("An unexpected error occurred"));
      }
    }
  }

  localnotify(message: string, status: number) {
    if (status === 1) {
      toast.success(message);
    } else if (status === 2) {
      toast.warn(message);
    } else {
      toast.error(message);
    }
  }
}

export const IISMethods = new _IISMethods();
