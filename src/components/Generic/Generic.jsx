import React, { useState } from "react";
import { AiFillFileImage } from "react-icons/ai";
import uploadFile from "../../services/Firebase/Firebase.Service";

const typeFileValidate = ["png", "jpg", "jpeg", "gif"];

export const Generic = () => {
  
  const [file, setFile] = useState({
    image: null,
    isValid: false,
    isReady: false,
  });

  const [error, setError] = useState(null);

  const fileHandler = async (e) => {
    const image = e.target.files[0];
    if (image) {
      console.log(image);
      const type = image.type?.split("/")[1];
      const isValid = typeFileValidate.some((typeFile) => typeFile === type);
      if (isValid) {
        const isReady = true;
        setFile({ image, isValid, isReady });
        setError(null);
      } else {
        const isReady = false;
        setFile({ image, isValid, isReady });
        setError(`La extencion .${type} no es valida!`);
      }
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const image = file.image;
    console.log(await uploadFile('images/users/', image))
    setFile({ image: null, isReady: false });
  };

  const uploadImage__button = file.isReady ? 'uploadImage__button uploadImage__button--primary': 'uploadImage__button uploadImage__button--disable';

  return (
    <div className={"uploadImage"}>
      <form className={"uploadImage__form"} onSubmit={handlerSubmit}>
        <div className={"uploadImage__form__item"}>
          <h1 className={"uploadImage__title text--align-center"}>Upload Image</h1>
        </div>
        <div className={"uploadImage__form__item"}>
          <label htmlFor="image" className={"uploadImage__container__icon"}>
            <div className={""}>
              <AiFillFileImage size={"5em"} className={"uploadImage__icon"} />
            </div>
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className={"input--display-none"}
            onChange={fileHandler}
          />
        </div>
        <div className={"uploadImage__form__item"}>
          <button className={uploadImage__button} disabled={!file.isReady}>Save</button>
        </div>
        <div className={"uploadImage__form__item"}>{error && <p>{error}</p>}</div>
      </form>
    </div>
  );
};
export default Generic;