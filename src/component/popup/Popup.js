import React from "react";
import styles from "./Popup.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Button from "../button/Button";
// 'Varela Round', sans-serif

function Popup({
  isOpen,
  title,
  message,
  onClose,
  onConfirm,
  icon,
  buttonTitle,
  body,
}) {
  return (
    <div>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.popupContainer}>
            <div className={styles.popupHeader}>
              {!icon ? (
                <IoIosCloseCircleOutline color="#f15e5e" size="100px" />
              ) : (
                icon
              )}
              <h4 className={styles.popupTitle}>{title}</h4>
              <div className={styles.popupCloseContainer} onClick={onClose}>
                <IoClose
                  className={styles.popupCloseIcon}
                  color="#999"
                  size="1.5rem"
                />
              </div>
            </div>
            <div className={styles.popupBody}>
              <div>{message}</div>
            </div>
            <div className={styles.popupFooter}>
              <Button
                buttonSize={"btnLarge"}
                buttonStyle={"btnGraySolid"}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                buttonSize={"btnLarge"}
                buttonStyle={"btnDangerSolid"}
                onClick={onConfirm}
              >
                {!buttonTitle ? "Confirm" : buttonTitle}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
