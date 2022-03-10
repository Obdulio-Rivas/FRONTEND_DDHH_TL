import React from "react";

const Skeleton = ({ elements = 0 }) => {
  const generateElements = (elements) => {
    const arrayOfElements = [];
    for (let i = 0; i < elements; i++) {
      arrayOfElements.push(i);
    }
    return arrayOfElements;
  };

  return (
    <div class="flex animate-pulse flex-col items-center w-full justify-center cursor-progress">
      {generateElements(elements).map((element) => {
        return (
          <div key={element} className="flex flex-row items-start w-full py-4">
            <div class="w-12 bg-gray-300 h-12 rounded-md "></div>
            <div class="flex flex-col w-full space-y-3 px-2">
              <div class="w-full bg-gray-300 h-6 rounded-md "></div>
              <div class="w-full bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center space-x-2 animate-pulse w-full">
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
        </div>
    </div>
  );
};

export default Skeleton;
