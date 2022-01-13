import React from 'react'
import { Route, Routes } from 'react-router-dom'

{/*const PrivateRoutes = (props) => {
    return (
    <Route exact={props.exact} path={props.path} element={props.element}/>
    );
};*/}

const PrivateRoutes = (props) => {
    return (
        <Route {...props}/>
    );
};
export default PrivateRoutes;