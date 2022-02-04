import React from "react";
import { useTable } from "react-table";
import TBody from "./TBody/TBody";
import THead from "./THead/THead";

const Table = ({
  tableData = [
    {
      Error: "No data provider",
      Description:
        "The prop tableData no has provided on the component declaration!",
    },
  ],
  options = null,
}) => {

  function getColumnsName(data = {}, options) {
    const columns = [];
    const columns_name = Object.keys(data[0]);
    console.log(columns_name)
    if (options?.colums) {
      columns_name.map((column_name, index) => {
        if (options?.colums.includes(index)) {
          columns.push({
            Header: column_name,
            accessor: "col" + (index + 1), // accessor is the "key" in the data
          });
        }
      });
    } else {
      columns_name.map((column_name, index) => {
        columns.push({
          Header: column_name,
          accessor: "col" + (index + 1), // accessor is the "key" in the data
        });
      });
    }
    console.log(columns);
    return columns;
  }

  function getDataRows(data = {}) {
    const rows = [];
    const number_rows = [...data].length;
    for (let i = 0; i < number_rows; i++) {
      let j = 0;
      let row = {};
      const keys = data[i];
      for (let key in keys) {
        j++;
        row = {
          ...row,
          ["col" + j]: keys[key],
        };
      }
      rows.push(row);
    }
    return rows;
  }

  const columns = React.useMemo(
    () => getColumnsName(tableData, options),
    [tableData, options]
  );

  const data = React.useMemo(() => getDataRows(tableData), [tableData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <THead headerGroups={headerGroups} />
      <TBody
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
      />
    </table>
  );
};

export default Table;
