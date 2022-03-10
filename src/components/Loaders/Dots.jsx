import React from 'react'

const Dots = () => {
    return (
        <div className="flex items-center justify-center space-x-2 animate-pulse cursor-progress w-full h-full absolute bg-slate-50 bg-opacity-70">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        </div>
    );
}

export default Dots