import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import clsx from "clsx";

import styles from "./Preview.module.css";
import Input from "../input/Input";

function Preview({ renderBody, data, onClickItem, addMode }) {
  const configInput = (
    id,
    className,
    nameAtt,
    type,
    value,
    placeholder,
    accept,
    multiple,
    disabled,
    hidden,
    required
  ) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
      accept: accept,
      disabled: disabled,
      multiple: multiple,
      hidden: hidden,
      required: required,
    };
  };

  const renderPreviewBody = () => {
    if (data.length === 0 || !data) {
      return (
        <>
          <div className={clsx(styles.previewItem, styles.nothing)}>
            <img
              className={styles.thumbnail}
              src="https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
              alt="Document"
            />
          </div>
          <div>
            {addMode.status && (
              <label htmlFor="documents" className={clsx(styles.uploadBtn)}>
                <AiOutlineCloudUpload className={styles.uploadIcon} />
                <p>Upload</p>
                <Input
                  onChange={addMode.onFileChange}
                  config={configInput(
                    "documents",
                    styles.fileInput,
                    "documents",
                    "file",
                    "",
                    "",
                    undefined,
                    true,
                    false,
                    true
                  )}
                />
              </label>
            )}
          </div>
        </>
      );
    }
    return data.map((item, index, array) => {
      return renderBody(item, index, array, onClickItem);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>{renderPreviewBody()}</div>
    </div>
  );
}

Preview.defaultProps = {
  addMode: {
    status: false,
  },
};

export default Preview;
