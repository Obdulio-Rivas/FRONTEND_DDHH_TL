import React from "react";
import Cell from "../Cell/Cell";

const row = ({data_row} = {}, options) => {
  //console.log(data_row);
  var result = [];

  for (var i in data_row) {
    result.push([i, data_row[i]]);
  }

  //console.log(result);

  return (
    <tr>
      {result.map((value) => (
        <Cell value={value[1]} />
      ))}
    </tr>
  );
};

export default row;
