import React from "react";

import styles from "./Select.module.css";

function Select({
  onChange,
  id,
  name,
  className,
  defaultValue,
  children,
  required,
  disabled,
}) {
  const handleOnChange = (event) => {
    onChange(event.target);
  };
  return (
    <select
      name={name}
      className={className ? className : styles.select}
      defaultValue={defaultValue !== "" ? defaultValue : ""}
      id={id}
      onChange={handleOnChange}
      required={required}
      disabled={disabled}
    >
      {children}
    </select>
  );
}

Select.defaultProps = {
  required: true,
};

export default Select;
