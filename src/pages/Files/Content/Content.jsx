import React, { useState,useEffect } from "react";
import ReactPaginate from "react-paginate";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import FirebaseService from "../../../services/Firebase/Firebase.Service";
import { saveAs } from "file-saver";
import img_folder from "./icons/img_folder.png";
import img_pdf from "./icons/img_pdf.png";
import img_png from "./icons/img_png.png";
import img_jpeg from "./icons/img_jpeg.png";
import img_jpg from "./icons/img_jpg.png";
import img_mpeg from "./icons/img_mpeg.png";
import img_docx from "./icons/img_docx.png";
import img_binary from "./icons/img_binary.png";
import Cubes from "../../../components/Loaders/Cubes";

const Content = ({
  content = [],
  isLoading = true,
  changeFolder,
  filter,
  handlerIsLoading = null,
}) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const handlerChange = (e) => {
    const { value } = e.target;
    filter(value);
    setSearch(value);
  };


  const handlerClick = (value) => {
    changeFolder(value);
  };

  const handlerDownloadFile = (bucket, fullPath, name) => {
    async function getDownloadURL(bucket, fullPath, name) {
      const public_url = await FirebaseService.downloadFile(bucket, fullPath);
      saveAs(public_url, name);
    }
    getDownloadURL(bucket, fullPath, name);
  };

  const getIconElement = (type) => {
    let url_icon = null;
    switch (type) {
      case "folder":
        url_icon = img_folder;
        break;
      case "pdf":
        url_icon = img_pdf;
        break;
      case "png":
        url_icon = img_png;
        break;
      case "jpeg":
        url_icon = img_jpeg;
        break;
      case "jpg":
        url_icon = img_jpg;
        break;
      case "mpeg":
        url_icon = img_mpeg;
        break;
      case "docx":
        url_icon = img_docx;
        break;

      default:
        url_icon = img_binary;
        break;
    }
    return url_icon;
  };

  const PER_PAGE = 20;

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  const currentPageData = content
    .slice(offset, offset + PER_PAGE)
    .map(({ bucket, fullPath, name, type, url, parent }, index) => {
      if (type === "folder") {
        return (
          <Link
            key={index}
            to={url}
            onClick={() => handlerClick(fullPath)}
            className={
              "flex justify-center border-2 border-gray-200 rounded-xl px-2 py-6 bg-gray-50 text-ellipsis"
            }
          >
            <div>
              <img
                className="mx-auto"
                src={getIconElement(type)}
                alt="Icon element"
              />
              <div
                className="capitalize text-base text-ellipsis overflow-hidden whitespace-nowrap"
                style={{
                  white_space: "nowrap",
                  text_overflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {name}
              </div>
            </div>
          </Link>
        );
      } else {
        return (
          <div
            key={index}
            onClick={() => handlerDownloadFile(bucket, fullPath, name)}
            className={
              "flex justify-center border-2 border-gray-200 rounded-xl px-2 py-6 bg-gray-50 cursor-pointer"
            }
          >
            <div>
              <img
                className="mx-auto"
                src={getIconElement(type)}
                alt="Icon element"
              />
              <div
                className="capitalize text-base text-ellipsis overflow-hidden whitespace-nowrap"
                style={{
                  white_space: "nowrap",
                  text_overflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {name}
              </div>
            </div>
          </div>
        );
      }
    });

  const pageCount = Math.ceil(content.length / PER_PAGE);

  return (
    <>
      <div className="flex flex-row border border-gray-200 rounded-xl px-4 py-4 bg-gray-50 justify-between items-center">
        <input
          type="text"
          name="search"
          value={search}
          className={"p-2 border border-gray-400 rounded-md"}
          placeholder={"Ingrese su busqueda..."}
          onChange={handlerChange}
        />
        <ReactPaginate
          className={`flex flex-row text-slate-500 font-medium justify-between items-center text-xl ${(pageCount === 0) ? 'hidden': null}`}
          previousLabel={<RiArrowLeftSLine  className="text-3xl"/>}
          nextLabel={<RiArrowRightSLine className="text-3xl"/>}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex flex-row justify-between items-center"}
          disabledClassName={"text-slate-600 cursor-not-allowed"}
          activeClassName={"text-slate-800 font-bold"}
        />
      </div>
      <div>
        {isLoading ? (
          <Cubes elements={(Math.random() * (11 - 1) + 1)} />
        ) : (
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mt-4 pb-10 p-2"
            }
          >
            {currentPageData}
          </div>
        )}
      </div>
    </>
  );
};

export default Content;
