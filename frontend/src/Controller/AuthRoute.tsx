import Cookies from 'js-cookie';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRouteProps {
    children : ReactNode | JSX.Element[] | JSX.Element | React.ReactElement | React.ReactElement[] | string
}

function AuthRoute({ children } : AuthRouteProps) {

    const token = Cookies.get('token');

    if(!token){
        return <Navigate to='/signin' />
    }

    return children;
}

export default AuthRoute