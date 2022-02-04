import React from "react";

const THead = ({ headerGroups = {} }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps()}
              style={{
                borderBottom: "solid 3px red",
                background: "aliceblue",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default THead;
