import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ErrorNotFound from "./view/components/ErrorNotFound";
import FormPage from "./view/form/FormPage";
import UserController from "./Controller/UserController";
import HomeController from "./Controller/HomeController";
import ResponseController from "./Controller/ResponseController";
import AuthRoute from "./Controller/AuthRoute";

export default function Router(){
    
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route 
                    path="/" 
                    element={
                        <AuthRoute>
                            <HomeController />
                        </AuthRoute>
                    } 
                    errorElement={<ErrorNotFound />}
                ></Route>

                <Route 
                    path="form/response/:formId"
                    element={<ResponseController formname="response" />}
                ></Route>

                <Route 
                    path="form/new"
                    element={
                        <AuthRoute>
                            <FormPage/>
                        </AuthRoute>
                    }
                ></Route>
                <Route 
                    path="form/edit/:formId"
                    element={
                        <AuthRoute>
                            <FormPage/>
                        </AuthRoute>
                    }
                ></Route>

                <Route path="/signin" element={<UserController pagename="signin" />}></Route>
                <Route path="/signup" element={<UserController pagename="signup" />}></Route>
            </>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}