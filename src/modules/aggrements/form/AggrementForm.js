import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./AggrementForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import { ROLES } from "../../../constants";

function AggrementForm({ mode }) {
  const navigate = useNavigate();
  const { aggrementId } = useParams();
  const [aggrement, setAggrement] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    // Check role base
    if (currentUser.role_id !== ROLES.ADMIN) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }

    if (mode === "update") {
      axiosClient
        .get(`http://localhost:3001/project/aggrement/${aggrementId}`)
        .then((response) => setAggrement({ ...response.data.data }))
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setAggrement({
        aggrement_name: "",
        description: "",
        status: 0,
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
      disabled: disabled,
    };
  };

  const handleOnChange = (target) => {
    setAggrement({ ...aggrement, [target.name]: target.value });
  };

  const handleOnChangeTextArea = ({ target }) => {
    setAggrement({ ...aggrement, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axiosClient
        .put(`http://localhost:3001/project/aggrement`, aggrement)
        .then((response) => {
          console.log(response.data);
          navigate("/aggrements/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    return axiosClient
      .post(`http://localhost:3001/project/aggrement`, {
        aggrement_name: aggrement.aggrement_name,
        description: aggrement.description,
        status: aggrement.status,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/aggrements/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!aggrement) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Aggrement` : `Create Aggrement`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Aggrement Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "aggrement_name",
              "text",
              aggrement.aggrement_name,
              "Your aggrement name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            rows={4}
            onChange={handleOnChangeTextArea}
            name="description"
            className={styles.description}
            id="description"
            value={aggrement.description}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role" className={styles.label}>
            Status
          </label>
          <Select
            name="status"
            defaultValue={aggrement.status === false ? "0" : "1"}
            id="status"
            onChange={handleOnChange}
          >
            <option value="" disabled hidden>
              Select the status
            </option>
            <option value="1">Active</option>
            <option value="0">Unactive</option>
          </Select>
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

export default AggrementForm;
