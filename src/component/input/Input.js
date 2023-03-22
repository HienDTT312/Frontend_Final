import React, { useEffect } from "react";
import styles from "./Input.module.css";

export default function Input({ config, onChange }) {
  const handleChange = ({ target }) => {
    // const isTrueSet = target.value === "true";
    // target.value = !isTrueSet;
    // target.checked = !isTrueSet;
    // newData = !isTrueSet;
    if (config.type === "file" || config.type === "checkbox") {
      return onChange(target);
    }
    if (config.type === "search") {
      let newData = target.value;
      return onChange(newData);
    }
    if (config.type === "checkbox") {
      return onChange(target);
    }
    let newData = {
      name: target.name,
      value: target.value,
    };
    onChange(newData);
  };

  // if (config.type === "checkbox") {
  //   return <div className={clsx(styles.checkboxItems)}></div>;
  // }

  return (
    <input
      onChange={handleChange}
      type={config.type}
      className={!config.className ? styles.formControl : config.className}
      placeholder={config.placeholder}
      id={config.id}
      value={config.value}
      name={config.name}
      accept={config.accept}
      disabled={config.disabled}
      required={config.required}
      hidden={config.hidden}
      checked={config.checked}
      multiple={config.multiple}
    />
  );
}
