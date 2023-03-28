import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./SuppliersList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import SupplierTableHead from "./table-head";
import { ROLES } from "../../../constants";
import Pagination from "../../../component/pagination/Pagination";

function SuppliersList() {
  const [supplierId, setSupplierId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  async function getSuppliers() {
    let res = await axiosClient.get("http://localhost:3001/service1/supplier");
    setSuppliers(res.data.data);
  }

  useEffect(() => {
    if (currentUser.role_id === ROLES.SALE_MANAGER) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    getSuppliers();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: suppliers.length,
    }));
  }, [suppliers.length]);

  useEffect(() => {
    setSeperatePage(
      suppliers.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > suppliers.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [suppliers, pagination.limit, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteSupplierId) => {
    setIsOpen(true);
    setSupplierId(deleteSupplierId);
  };

  const handleClickDeleteSupplier = (deleteSupplierId) => {
    axiosClient
      .delete(`http://localhost:3001/service1/supplier/${deleteSupplierId}`)
      .then((response) => {
        console.log(response.data);
        getSuppliers();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (supplier, index, onClickDelete) => {
    const convertFormat = (date) => {
      const newDate = new Date(date);
      return [
        newDate.getDate(),
        newDate.getMonth() + 1,
        newDate.getFullYear(),
      ].join("/");
    };

    return (
      <tr
        style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
        key={`${supplier.supplier_id} - ${index}`}
      >
        <td>{supplier.supplier_name}</td>
        <td>{supplier.supplier_address}</td>
        <td>{supplier.manager}</td>
        <td>{supplier.status}</td>
        <td>{supplier.phone_number}</td>
        <td>{supplier.created_date}</td>
        <td>{supplier.updated_date}</td>
        {/* <td>{supplier.status}</td> */}
        <td>
          <Link
            className={styles.iconAction}
            to={`/suppliers/update/${supplier.supplier_id}`}
          >
            <BiEditAlt />
          </Link>
          <RiDeleteBin5Line
            className={styles.iconAction}
            onClick={() => onClickDelete(supplier.supplier_id)}
          />
        </td>
      </tr>
    );
  };

  if (suppliers.length === 0) {
    return (
      <div>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Table
        loading={false}
        head={<SupplierTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={seperatePage}
        title={"Supplier List"}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteSupplier(supplierId)}
      />
    </div>
  );
}

export default SuppliersList;
