import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { BiFolder } from "react-icons/bi";
import { MdArrowForwardIos } from "react-icons/md";

const Breadcrumb = ({changeFolder}) => {
  const params = useLocation();
  const [treePath, setTreePath] = useState([]);

  const handlerClick = (value) => {
    changeFolder(value)
  }

  useEffect(() => {
    let paths = null;
    let allPaths = null;
    let fullPaths = [];
    allPaths = params.pathname.split("/");
    paths = allPaths.filter((path) => path !== "");
    fullPaths = paths.map((pathName, index) => {
        return {
            pathName: pathName,
            fullPath: index === 0 ? '/'+pathName : params.pathname.split(pathName)[0] + pathName
        };
    })
    setTreePath(fullPaths);
  }, [params.pathname]);

  return (
    <nav
    className="flex my-5 py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {treePath.map(({pathName, fullPath}, index) => {
          return (
            <li key={index} className="inline-flex items-center">
              {index === 0 ? (
                <BiFolder className="w-4 h-4 mr-2 text-gray-400" />
              ) : (
                <MdArrowForwardIos className="w-4 h-4 mr-2 text-gray-400" />
              )}
              <Link
                to={fullPath}
                onClick={()=>handlerClick(pathName === 'files' ? '/' : pathName)}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span className="capitalize">{pathName}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
