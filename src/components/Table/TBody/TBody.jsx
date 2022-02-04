import React from "react";
import Row from "../Row/Row";

const TBody = ({ getTableBodyProps, rows, prepareRow }) => {

  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map((cell) => {
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: "10px",
                    border: "solid 1px gray",
                    background: "papayawhip",
                  }}
                >
                  {cell.render("Cell")}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TBody;
