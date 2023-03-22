import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import styles from "./LoginForm.module.css";
import slider from "./../../assets/background/loginBg.png";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import { isLogin } from "../../helpers/isLogin";
import axiosClient from "../../apis/axios.config";
import Popup from "../../component/popup/Popup";

export default function LoginForm() {
  const [account, setAccount] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recoverUsername, setRecoverUsername] = useState("");
  const navigate = useNavigate();

  const configInput = (
    id,
    className,
    nameAtt,
    type,
    value,
    placeholder,
    checked
  ) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
      checked: checked,
    };
  };

  const handleOnChange = (newData) => {
    setAccount({ ...account, [newData.name]: newData.value });
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleOnRecoverChange = (target) => {
    setRecoverUsername(target.value);
  };

  const onClickForget = () => {
    setIsOpen(true);
  };

  const body = (
    <div className={clsx(styles.formGroup, styles.recoverGroup)}>
      <label htmlFor="recoverUn" className={styles.label}>
        Username:
      </label>
      <Input
        onChange={handleOnRecoverChange}
        config={configInput(
          "recoverUn",
          "",
          "recover_username",
          "email",
          recoverUsername,
          "Type your username"
        )}
      />
    </div>
  );

  useEffect(() => {
    if (isLogin()) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  async function getToken() {
    const res = await axiosClient.post(
      "http://localhost:3001/service1/login",
      account
    );
    localStorage.setItem("accessToken", res.data.token);

    const currentUser = await axiosClient.get(
      "http://localhost:3001/service1/identity"
    );
    localStorage.setItem("currentUser", JSON.stringify(currentUser.data.data));
    navigate("/dashboard", { replace: true });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getToken();
  };

  const handleClickRecover = () => {
    axiosClient
      .post(`http://localhost:3001/service1/forgot-password`, {
        username: recoverUsername,
      })
      .then((res) => {
        alert("Sended Email");
        console.log(res.data.data);
        setIsOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCheckbox = () => {
    setRemember(!remember);
  };

  return (
    <Fragment>
      <section className={clsx(styles.container)}>
        <div className={clsx(styles.content)}>
          <div className={clsx(styles.left, "row")}>
            <div className={clsx("col lg9")}>
              <h3 className={clsx(styles.title)}>
                Login to <strong>Project</strong>
              </h3>
              <p className={clsx(styles.text)}>
                Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                consectetur adipisicing.
              </p>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="username" className={styles.label}>
                    Username:
                  </label>
                  <Input
                    onChange={handleOnChange}
                    config={configInput(
                      "username",
                      styles.formInput,
                      "username",
                      "text",
                      account.username,
                      "your-email@gmail.com"
                    )}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="username" className={styles.label}>
                    Password:
                  </label>
                  <Input
                    onChange={handleOnChange}
                    config={configInput(
                      "password",
                      styles.formInput,
                      "password",
                      "password",
                      account.password,
                      "Your password"
                    )}
                  />
                </div>
                <div className={clsx(styles.rememberContainer)}>
                  <label className={styles.rememberContent} htmlFor="rem">
                    <Input
                      onChange={handleCheckbox}
                      config={configInput(
                        "rem",
                        styles.rememberInput,
                        "remember",
                        "checkbox",
                        remember,
                        undefined,
                        remember
                      )}
                    />
                    <span>Remember me</span>
                  </label>
                  <Button
                    type="button"
                    className={clsx(styles.btn, styles.forgetPw)}
                    onClick={onClickForget}
                  >
                    Forget password
                  </Button>
                </div>
                <Button
                  type="submit"
                  buttonSize="btnExLarge"
                  buttonStyle="btnPurpleSolid"
                >
                  Log In
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className={clsx(styles.content, styles.slider)}>
          {/* Slider */}
          <img
            src={slider}
            alt="Slider login"
            className={clsx(styles.imgRight)}
          />
        </div>
      </section>
      <Popup
        isOpen={isOpen}
        title="Brands & Conditions"
        message={body}
        onClose={handleClickClose}
        onConfirm={handleClickRecover}
      />
    </Fragment>
  );
}
