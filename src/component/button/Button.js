import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

// const STYLES = [
//   "btnPrimarySolid",
//   "btnWarningSolid",
//   "btnDangerSolid",
//   "btnSuccessSolid",
//   "btnYellowSolid",
//   "btnGraySolid",
//   "btnPrimarySolidOutline",
//   "btnWarningSolidOutline",
//   "btnDangerSolidOutline",
//   "btnSuccessSolidOutline",
//   "btnYellowSolidOutline",
//   "btnGraySolidOutline",
// ];
// const SIZES = [
//   "btnSmall",
//   "btnMedium",
//   "btnLarge",
//   "btnExLarge",
//   "btnSecondary",
// ];

export default function Button(props) {
  // const checkButtonStyle = STYLES.includes(props.buttonStyle)
  //   ? props.buttonStyle
  //   : STYLES[0];

  // const checkButtonSize = SIZES.includes(props.buttonSize)
  //   ? props.buttonSize
  //   : SIZES[0];

  return (
    <button
      className={clsx(
        styles.btn,
        styles[props.buttonStyle],
        styles[props.buttonSize],
        props.className
      )}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
