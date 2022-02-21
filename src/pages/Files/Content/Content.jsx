import React from "react";
import { Link } from "react-router-dom";
import FirebaseService from "../../../services/Firebase/Firebase.Service";
import { saveAs } from "file-saver";

const Content = ({ content, changeFolder }) => {
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
        url_icon = "../folder.png";
        break;
      case "pdf":
        url_icon = "../pdf_file.png";
        break;
      case "png":
        url_icon = "../png_file.png";
        break;
      case "jpeg":
        url_icon = "../jpeg_file.png";
        break;
      case "jpg":
        url_icon = "../jpg_file.png";
        break;
      case "mpeg":
        url_icon = "../mpeg_file.png";
        break;
      case "docx":
        url_icon = "../doc_file.png";
        break;

      default:
        url_icon = "../folder.png";
        break;
    }
    return url_icon;
  };

  return (
    <>
      <div
        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mt-4"}
      >
        {content.map(({ bucket, fullPath, name, type, url, parent }, index) => {
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
                  <span
                    className="capitalize text-base text-ellipsis overflow-hidden whitespace-nowrap"
                    style={{
                      white_space: "nowrap",
                      text_overflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {name}
                  </span>
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
                  <span
                    className="capitalize text-base text-ellipsis overflow-hidden whitespace-nowrap"
                    style={{
                      white_space: "nowrap",
                      text_overflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {name}
                  </span>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Content;
