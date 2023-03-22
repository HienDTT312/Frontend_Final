import React, { useEffect, useState } from "react";

import styles from "./Switch.module.css";
import Input from "../input/Input";

function Switch({ onChange, isChecked }) {
  const [value, setValue] = useState(true);

  useEffect(() => {
    setValue(isChecked);
  }, [isChecked]);

  const configInput = (
    id,
    className,
    nameAtt,
    type,
    value,
    placeholder,
    checked,
    accept,
    disabled
  ) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
      accept: accept,
      checked: checked,
      disabled: disabled,
    };
  };

  const onChangeSwitch = (target) => {
    const { checked } = target;
    setValue(checked);
    onChange(checked);
  };

  return (
    <label className={styles.switch}>
      <Input
        onChange={onChangeSwitch}
        config={configInput(
          "",
          styles.switchInput,
          "",
          "checkbox",
          undefined,
          undefined,
          value
        )}
      />
      <span className={styles.slider} />
    </label>
  );
}

export default Switch;
