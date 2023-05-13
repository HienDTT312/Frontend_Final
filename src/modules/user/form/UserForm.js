import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";

import defaultAvt from "./../../../assets/user/avatar/defaultUserImage.png";
import styles from "./UserForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import { ROLES } from "../../../constants";

function UserForm({ mode }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState();
  const [oldImage, setOldImage] = useState(false);

  useEffect(() => {
    // Check role base
    if (currentUser.role_id !== ROLES.ADMIN) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }

    if (mode === "update") {
      axiosClient
        .get(`http://localhost:3001/project/user/${username}`)
        .then((response) => {
          setUser({
            ...response.data.data,
            phone: response.data.data.phone.toString(),
          });
          setPreview(`http://localhost:3001/${response.data.data.avatar}`);
        });
    } else if (mode === "create") {
      setUser({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        full_name: "",
        gender: "",
        role_id: "",
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
      return setUser({ ...user, [target.name]: target.files[0] });
    }
    setUser({ ...user, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (mode === "update") {
      formData.append("full_name", user.full_name);
      formData.append("last_name", user.last_name);
      formData.append("first_name", user.first_name);
      formData.append("gender", user.gender);
      formData.append("phone", user.phone);
      formData.append("role_id", +user.role_id);
      formData.append("avatar", user.avatar);
      formData.append("old_image", oldImage);

      return axiosClient
        .put(`http://localhost:3001/project/user/${user.user_id}`, formData)
        .then((response) => {
          console.log(response.data);
          navigate("/users/view", { replace: true });
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }

    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("full_name", user.full_name);
    formData.append("last_name", user.last_name);
    formData.append("first_name", user.first_name);
    formData.append("gender", user.gender);
    formData.append("phone", user.phone);
    formData.append("role_id", +user.role_id);
    formData.append("avatar", user.avatar);

    async function fetchData() {
      return await axiosClient
      .post(`http://localhost:3001/project/user`, formData)
      .then((response) => {
        // console.log(response.data);
        if (response.data) {
          console.log(response.data);
        }
        if (response.errors) {
          alert(response.errors);
        }
        console.log(response);
        navigate("/users/view", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        // alert(err.toJSON());
        // console.log(err);
      });
    }

    return fetchData();
  };

  if (!user) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update User` : `Create User`}
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
              user.username,
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
                user.password,
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
              user.first_name,
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
              user.last_name,
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
              user.full_name,
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
                  // !user.gender ? "male" : user.gender
                  "male",
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  user.gender === "male"
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
                  // !user.gender ? "female" : user.gender
                  "female",
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  undefined,
                  user.gender === "female"
                )}
              />
              <label htmlFor="female" className={styles.radioLabel}>
                Female
              </label>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>
            Role
          </label>
          <Select
            name="role_id"
            defaultValue={user.role_id === "" ? "" : user.role_id}
            id="role"
            onChange={handleOnChange}
          >
            <option value="" disabled hidden>
              Choose your role...
            </option>
            <option value="3">Sale Manager</option>
            <option value="4">Manager</option>
            <option value="1">Staff</option>
            <option value="2">Admin</option>
          </Select>
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
              user.phone,
              "Your Phone"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Avatar</label>
          <div className={styles.preview}>
            <img
              className={styles.imgPreview}
              src={user.avatar === "" ? defaultAvt : preview}
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

export default UserForm;
