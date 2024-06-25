// import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { IISMethods } from '../config/IISMethods';

interface AuthRouteProps {
    children : ReactNode | JSX.Element[] | JSX.Element | React.ReactElement | React.ReactElement[] | string
}

function AuthRoute({ children } : AuthRouteProps) {

    // const token = Cookies.get('token');

    const user = IISMethods.getLocalStorageData('user');

    if(!user){
        return <Navigate to='/signin' />
    }

    return children;
}

export default AuthRoute