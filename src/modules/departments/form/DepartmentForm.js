import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./DepartmentForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import { ROLES } from "../../../constants";

function DepartmentForm({ mode }) {
  const navigate = useNavigate();
  const { departmentID } = useParams();
  const [department, setDepartment] = useState(null);
  const [managers, setManagers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    // Check role base
    if (currentUser.role_id !== ROLES.ADMIN) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }

    // Get manager
    axiosClient.get(`http://localhost:3001/service1/user`).then((response) => {
      const filterManger = response.data.data.rows.filter((manager) => {
        return manager.role_id === 3;
      });
      console.log(filterManger);
      setManagers(filterManger);
    });
    if (mode === "update") {
      axiosClient
        .get(`http://localhost:3001/service1/department/${departmentID}`)
        .then((response) => setDepartment({ ...response.data.data }))
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setDepartment({
        department_name: "",
        description: "",
        manager_id: "",
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
    setDepartment({ ...department, [target.name]: target.value });
  };

  const handleOnChangeTextArea = ({ target }) => {
    setDepartment({ ...department, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axiosClient
        .put(`http://localhost:3001/service1/department`, {
          department_name: department.department_name,
          description: department.description,
          manager_id: department.manager_id,
          department_id: department.department_id,
        })
        .then((response) => {
          console.log(response.data);
          navigate("/departments/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    return axiosClient
      .post(`http://localhost:3001/service1/department`, {
        department_name: department.department_name,
        description: department.description,
        manager_id: department.manager_id,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/departments/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!department) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Department` : `Create Department`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Department Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "department_name",
              "text",
              department.department_name,
              "Your department name"
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
            placeholder="Your description"
            className={styles.description}
            id="description"
            value={department.description}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="manager" className={styles.label}>
            Manager Name
          </label>
          <Select
            name="manager_id"
            onChange={handleOnChange}
            id="manager"
            defaultValue={
              department.manager_id !== "" ? department.manager_id : ""
            }
          >
            <option hidden disabled value="">
              Choose Your Manager Name ...
            </option>
            {managers.map((manager, index) => (
              <option
                key={`${manager.username} ${index}`}
                value={manager.user_id}
              >
                {manager.full_name}
              </option>
            ))}
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

export default DepartmentForm;
