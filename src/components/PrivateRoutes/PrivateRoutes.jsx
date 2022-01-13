import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

{/*const PrivateRoutes = (props) => {
    return (
    <Route exact={props.exact} path={props.path} element={props.element}/>
    );
};*/}

const PrivateRoutes = ({children}) => {
    const auth = true;
    return auth ? children : <Navigate to="/" />;
};
export default PrivateRoutes;