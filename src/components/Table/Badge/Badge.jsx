import React from "react";

const Badge = ({ value = "" }) => {
  return (
      <span class="bg-green-400 text-gray-50 rounded-md px-2">{value}</span>
  );
};

export default Badge;