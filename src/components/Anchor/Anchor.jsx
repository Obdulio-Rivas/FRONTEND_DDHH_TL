import React from "react";

const Anchor = (props) => {
  return <a {...props}>{props.children}</a>;
};

export default Anchor;
