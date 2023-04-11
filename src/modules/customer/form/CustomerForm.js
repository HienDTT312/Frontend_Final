import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";

import defaultAvt from "./../../../assets/customer/avatar/defaultCustomerImage.png";
import styles from "./CustomerForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import { ROLES } from "../../../constants";

function CustomerForm({ mode }) {
  const navigate = useNavigate();
  const currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
  const { username } = useParams();
  const [customer, setCustomer] = useState(null);
  const [preview, setPreview] = useState();
  const [oldImage, setOldImage] = useState(false);

  useEffect(() => {
    // Check role base
    if (mode === "update") {
      axiosClient
        .get(`http://localhost:3001/project/customer/${username}`)
        .then((response) => {
          setCustomer({
            ...response.data.data,
            phone: response.data.data.phone.toString(),
          });
          setPreview(`http://localhost:3001/${response.data.data.avatar}`);
        });
    } else if (mode === "create") {
      setCustomer({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        full_name: "",
        gender: "",
        phone: "",
        avatar: "",
      });
    }
  }, []);

  const configInput = (
    id,
    className,
    nameAtt,
    type,
    value,
    placeholder,
    accept,
    disabled,
    hidden,
    required = false,
    checked = false
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
      hidden: hidden,
      required: required,
      checked: checked,
    };
  };

  const handleOnChange = (target) => {
    if (target.name === "avatar") {
      // Change preview avatar by using FileReader
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      setOldImage(true);
      return setCustomer({ ...customer, [target.name]: target.files[0] });
    }
    setCustomer({ ...customer, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (mode === "update") {
      formData.append("full_name", customer.full_name);
      formData.append("last_name", customer.last_name);
      formData.append("first_name", customer.first_name);
      formData.append("gender", customer.gender);
      formData.append("phone", customer.phone);
      formData.append("avatar", customer.avatar);
      formData.append("old_image", oldImage);

      return axiosClient
        .put(`http://localhost:3001/project/customer/${customer.user_id}`, formData)
        .then((response) => {
          console.log(response.data);
          navigate("/customers/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    formData.append("username", customer.username);
    formData.append("password", customer.password);
    formData.append("full_name", customer.full_name);
    formData.append("last_name", customer.last_name);
    formData.append("first_name", customer.first_name);
    formData.append("gender", customer.gender);
    formData.append("phone", customer.phone);
    formData.append("avatar", customer.avatar);

    return axiosClient
      .post(`http://localhost:3001/project/customer`, formData)
      .then((response) => {
        console.log(response.data);
        navigate("/customers/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!customer) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Customer` : `Create Customer`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "username",
              styles.formInput,
              "username",
              "text",
              customer.username,
              "Your username",
              "",
              mode === "update" ? true : false
            )}
          />
        </div>
        {mode === "create" && (
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <Input
              onChange={handleOnChange}
              config={configInput(
                "password",
                styles.formInput,
                "password",
                "password",
                customer.password,
                "Your password"
              )}
            />
          </div>
        )}
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "firstName",
              styles.formInput,
              "first_name",
              "text",
              customer.first_name,
              "Your First Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "lastName",
              styles.formInput,
              "last_name",
              "text",
              customer.last_name,
              "Your First Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "fullName",
              styles.formInput,
              "full_name",
              "text",
              customer.full_name,
              "Your Full Name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Gender</label>
          <div className={styles.radioContainer}>
            <div className={styles.radioContent}>
              <Input
                onChange={handleOnChange}
                config={configInput(
                  "male",
                  styles.radioInput,
                  "gender",
                  "radio",
                  // !customer.gender ? "male" : customer.gender
                  "male",
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  customer.gender === "male"
                )}
              />
              <label htmlFor="male" className={styles.radioLabel}>
                Male
              </label>
            </div>
            <div className={styles.radioContent}>
              <Input
                onChange={handleOnChange}
                config={configInput(
                  "female",
                  styles.radioInput,
                  "gender",
                  "radio",
                  // !customer.gender ? "female" : customer.gender
                  "female",
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  customer.gender === "female"
                )}
              />
              <label htmlFor="female" className={styles.radioLabel}>
                Female
              </label>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "phone",
              "",
              "phone",
              "text",
              customer.phone,
              "Your Phone"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Avatar</label>
          <div className={styles.preview}>
            <img
              className={styles.imgPreview}
              src={customer.avatar === "" ? defaultAvt : preview}
              alt="preview avatar"
            />
            <label htmlFor="avatar" className={styles.uploadBtn}>
              <AiOutlineUpload />
              Upload
            </label>
          </div>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "avatar",
              styles.avatarInput,
              "avatar",
              "file",
              "",
              "",
              "image/*"
            )}
          />
        </div>
        <Button
          type={"submit"}
          buttonSize={"btnLarge"}
          buttonStyle={"btnPurpleSolid"}
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}

export default CustomerForm;
