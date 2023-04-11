import React, { useState } from "react";
import { ImStack } from "react-icons/im";
import { useParams } from "react-router-dom";
import axiosClient from "../../../apis/axios.config";
import Button from "../../../component/button/Button";
import Input from "../../../component/input/Input";
import Spinner from "../../../component/spinner/Spinner";

import styles from "./ResetPassword.module.css";

function ResetPassword() {
  const [customer, setCustomer] = useState({ new_password: "", confirmPassword: "" });
  let { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
    if (customer.new_password !== customer.confirmPassword) {
      return alert("Doesnt match");
    }
    axiosClient
      .post(`http://localhost:3001/project/reset-password/${token}`, {
        new_password: customer.new_password,
        confirm_password: customer.confirmPassword,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleOnChange = (newData) => {
    setCustomer({ ...customer, [newData.name]: newData.value });
  };

  const configInput = (name, className, type, value, placeholder) => {
    return {
      name: name,
      className: className,
      type: type,
      value: value,
      placeholder: placeholder,
    };
  };

  if (!customer) {
    return (
      <div>
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.logo}>
            <ImStack style={{ fontSize: "26px" }} />
            <span className={styles.logoText}>Purple</span>
          </div>
          <p className={styles.text}>
            Reset password is easy. It only takes a few steps
          </p>
          <div className={styles.formGroup}>
            <Input
              onChange={handleOnChange}
              config={configInput(
                "new_password",
                styles.formInput,
                "password",
                customer.new_password,
                "Type your password"
              )}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              onChange={handleOnChange}
              config={configInput(
                "confirmPassword",
                styles.formInput,
                "password",
                customer.confirmPassword,
                "Confirm your password"
              )}
            />
          </div>
          <Button
            type="submit"
            buttonSize="btnExLarge"
            buttonStyle="btnPurpleSolid"
            className={styles.confirmBtn}
          >
            Confirm
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
