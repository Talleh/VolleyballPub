import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import UserContext from '../context/userContext';

export default function ProtectedRoute(Component:JSX.Element){
    const userContext = useContext(UserContext);
    return <div></div>;
}