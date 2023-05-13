import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./CategoryForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import { ROLES } from "../../../constants";

function CategoryForm({ mode }) {
  const navigate = useNavigate();
  const { cateId } = useParams();
  const [department, setDepartment] = useState([]);
  const [category, setCategory] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (currentUser.role_id === ROLES.STAFF) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    if (mode === "update") {
      axiosClient
        .get(`http://localhost:3001/project/category/${cateId}`)
        .then((res) => setCategory(res.data.data))
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setCategory({
        category_name: "",
        description: "",
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
    setCategory({ ...category, [target.name]: target.value });
  };

  const handleOnChangeTextArea = ({ target }) => {
    setCategory({ ...category, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axiosClient
        .put(`http://localhost:3001/project/category`, category)
        .then((response) => {
          console.log(response.data);
          navigate("/categories/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    return axiosClient
      .post(`http://localhost:3001/project/category`, {
        category_name: category.category_name,
        description: category.description,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/categories/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!category) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Category` : `Create Category`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Category Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "category_name",
              "text",
              category.category_name,
              "Your category name"
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
            value={category.description}
          ></textarea>
        </div>
        {/* <div className={styles.formGroup}>
          <label htmlFor="department" className={styles.label}>
            Department
          </label>
          <Select
            name="department_id"
            onChange={handleOnChange}
            id="department"
            defaultValue={
              category.department_id !== "" ? category.department_id : ""
            }
          >
            <option hidden disabled value="">
              Choose Your Department ID ...
            </option>
            {department.map((item, index) => (
              <option
                key={`${item.department_name} ${index}`}
                value={item.department_id}
              >
                {item.department_name}
              </option>
            ))}
          </Select>
        </div> */}
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

export default CategoryForm;
