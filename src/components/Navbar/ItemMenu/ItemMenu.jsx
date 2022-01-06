import React from 'react'

const ItemMenu = (props) => {

    const {title, href} = props;

    return (
        <li>
          <a
            href={href}
            className="flex px-4 py-2 font-medium rounded-md"
          >
            {title}
          </a>
        </li>
    )
}

export default ItemMenu
