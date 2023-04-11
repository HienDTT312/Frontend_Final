import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import styles from "./SupplierForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import { ROLES } from "../../../constants";

function SupplierForm({ mode }) {
  const navigate = useNavigate();
  const { supplierID } = useParams();
  const [supplier, setSupplier] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    // Check role base
    if (currentUser.role_id !== ROLES.ADMIN) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    if (mode === "update") {
      axiosClient
        .get(`http://localhost:3001/project/supplier/${supplierID}`)
        .then((response) => {
          setSupplier({ ...response.data.data });
        })
        .catch((err) => console.log(err));
    } else if (mode === "create") {
      setSupplier({
        supplier_name: "",
        supplier_number: "",
        supplier_address: "",
        supplier_manager: "",
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
    setSupplier({ ...supplier, [target.name]: target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "update") {
      return axiosClient
        .put(`http://localhost:3001/project/supplier`, {
          supplier_name: supplier.supplier_name,
          status: supplier.supplier_status,
          phone_number: supplier.supplier_number,
          supplier_address: supplier.supplier_address,
          manager: supplier.supplier_manager,
        })
        .then((response) => {
          console.log(response.data);
          navigate("/suppliers/view", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    return axiosClient
      .post(`http://localhost:3001/project/supplier`, {
        supplier_name: supplier.supplier_name,
        status: supplier.supplier_status,
        phone_number: supplier.supplier_number,
        supplier_address: supplier.supplier_address,
        manager: supplier.supplier_manager,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/suppliers/view", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  if (!supplier) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Supplier` : `Create Supplier`}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Supplier Name
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "name",
              styles.formInput,
              "supplier_name",
              "text",
              supplier.name,
              "Your supplier name"
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="supplier_address" className={styles.label}>
            Supplier Address
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "address",
              styles.formInput,
              "supplier_address",
              "text",
              supplier.supplier_address,
              "Your supplier address"
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
              "supplier_number",
              "text",
              supplier.supplier_number,
              "Your supplier number"
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
              "supplier_manager",
              "text",
              supplier.supplier_manager,
              "Your supplier manager's name"
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
              "supplier_status",
              "text",
              supplier.supplier_status,
              "Your supplier status"
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

export default SupplierForm;
