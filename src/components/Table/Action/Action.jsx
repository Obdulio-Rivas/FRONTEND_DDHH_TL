import React from 'react';
import { Link } from "react-router-dom";

const Action = ({value}) => {
    const fullPath = window.location.href;
  return <Link to={fullPath}>{value}</Link>;
};

export default Action;
