import React, { FunctionComponent, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { routers } from '../constants';
import UserContext from '../context/userContext';

export default function ProtectedRoute(props: RouteProps){
    const userContext = useContext(UserContext);
    if(userContext.token)
    return <Route {...props} />
    return <Redirect to={routers.games}/>;
}