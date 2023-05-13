import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import styles from "./BrandForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import { ROLES } from "../../../constants";

function BrandForm({ mode }) {
  const navigate = useNavigate();
  const { brandID } = useParams();
  const [brand, setBrand] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    // Check role base
    if (currentUser.role_id !== ROLES.ADMIN) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    if (mode === "update") {
      axiosClient
        .get(`http://localhost:3001/project/brand/${brandID}`)
        .then((response) => {
          setBrand({ ...response.data.data });
        })
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setBrand({
        brand_name: "",
        phone_number: "",
        brand_address: "",
        manager: "",
        status: "",
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
    setBrand({ ...brand, [target.name]: target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axiosClient
        .put(`http://localhost:3001/project/brand`, {
          brand_name: brand.brand_name,
          brand_id: brand.brand_id,
          status: brand.status,
          phone_number: brand.phone_number,
          brand_address: brand.brand_address,
          manager: brand.manager,
        })
        .then((response) => {
          console.log(response.data);
          navigate("/brands/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    return axiosClient
      .post(`http://localhost:3001/project/brand`, {
        brand_name: brand.brand_name,
        status: brand.status,
        phone_number: brand.phone_number,
        brand_address: brand.brand_address,
        manager: brand.manager,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/brands/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!brand) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Brand` : `Create Brand`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Brand Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "brand_name",
              "text",
              brand.brand_name,
              "Your brand name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="brand_address" className={styles.label}>
            Brand Address
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "address",
              styles.formInput,
              "brand_address",
              "text",
              brand.brand_address,
              "Your brand address"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Phone Number
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "phone",
              styles.formInput,
              "phone_number",
              "text",
              brand.phone_number,
              "Your brand number"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="manager" className={styles.label}>
            Manager
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "manager",
              styles.formInput,
              "manager",
              "text",
              brand.manager,
              "Your brand manager's name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>
            Status
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "status",
              styles.formInput,
              "status",
              "text",
              brand.status,
              "Your brand status"
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

export default BrandForm;
