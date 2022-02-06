import React from 'react';
import { AiOutlineFolder } from "react-icons/ai";

const Historical = ({user}) => {
  return <div className="bg-white p-3 border-gray-200 border-2 rounded-md">
    
  <div className="grid grid-cols-2">
      <div>
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-2">
              <span clas="text-green-500">
                  <AiOutlineFolder className={"text-xl"} />
              </span>
              <span className="tracking-wide">Ultimos Casos</span>
          </div>
          <ul className="list-inside space-y-2 px-4">
              <li>
                  <div className="text-teal-600">Creacion de caso "Violencia Familiar".</div>
                  <div className="text-gray-500 text-xs">1/2/2022</div>
              </li>
              <li>
                  <div className="text-teal-600">Creacion de caso "Maltrato familiar".</div>
                  <div className="text-gray-500 text-xs">1/2/2022</div>
              </li>
          </ul>
      </div>
  </div>

</div>;
};

export default Historical;
