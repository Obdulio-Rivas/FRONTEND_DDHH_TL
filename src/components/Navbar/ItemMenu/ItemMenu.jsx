import React from 'react'
import { Link } from "react-router-dom";
const ItemMenu = (props) => {
    const {title, href,  optionStatus, haddlerClickOption } = props;
    
    const haddlerClick = () => {
      haddlerClickOption(title, !optionStatus.optionSelected);
    };
    
    return (
        <li onClick={()=> haddlerClick()}>
          <Link
            to={href}
            className={`flex px-4 py-2 font-medium rounded-md text-gray-${optionStatus.option === title ? '900': '700'}`}
          >
            {title}
          </Link>
        </li>
    )
}

export default ItemMenu
