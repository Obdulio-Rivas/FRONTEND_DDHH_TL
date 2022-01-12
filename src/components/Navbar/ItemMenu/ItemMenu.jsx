import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const ItemMenu = (props) => {

    const {title, href} = props;

    return (
        <li>
          <Link
            to={href}
            className="flex px-4 py-2 font-medium rounded-md"
          >
            {title}
          </Link>
        </li>
    )
}

export default ItemMenu
