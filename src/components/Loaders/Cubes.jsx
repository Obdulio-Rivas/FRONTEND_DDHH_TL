import React from "react";

const Cubes = ({ elements = 0 }) => {
  const generateElements = (elements) => {
    const arrayOfElements = [];
    for (let i = 0; i < elements; i++) {
      arrayOfElements.push(i);
    }
    return arrayOfElements;
  };

  return (
    <>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mt-4 pb-10 animate-pulse items-center w-full justify-center cursor-progress px-4">
        {generateElements(elements).map((element) => {
          return (
            <div
              key={element}
              className="flex flex-col items-start w-full py-4"
            >
              <div class="w-12 bg-gray-300 h-12 rounded-md "></div>
              <div class="flex flex-col w-full space-y-3 my-4">
                <div class="w-full bg-gray-300 h-6 rounded-md "></div>
                <div class="w-full bg-gray-300 h-6 rounded-md "></div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cubes;
