import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./DepartmentsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import DepartmentTableHead from "./table-head";
import { ROLES } from "../../../constants";
import Pagination from "../../../component/pagination/Pagination";

function DepartmentsList({ currentPage, onCurrentPage, onPageSize }) {
  const [departmentId, setDepartmentId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  async function getDepartments() {
    let res = await axiosClient.get(
      "http://localhost:3001/service1/department"
    );
    setDepartments(res.data.data);
  }

  useEffect(() => {
    if (currentUser.role_id === ROLES.SALE_MANAGER) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    getDepartments();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: departments.length,
    }));
  }, [departments.length]);

  useEffect(() => {
    setSeperatePage(
      departments.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > departments.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [departments, pagination.limit, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteDepartmentId) => {
    setIsOpen(true);
    setDepartmentId(deleteDepartmentId);
  };

  const handleClickDeleteCate = (deleteDepartmentId) => {
    axiosClient
      .delete(
        `http://localhost:3001/service1/department/${deleteDepartmentId}`
      )
      .then((response) => getDepartments())
      .catch((err) => console.log(err));
  };

  const renderRows = (department, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${department.department_id} - ${index}`}
    >
      <td>{department.department_name}</td>
      <td>{department.manager_id}</td>
      <td>{department.description}</td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/departments/update/${department.department_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(department.department_id)}
        />
      </td>
    </tr>
  );

  if (departments.length === 0) {
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
        head={<DepartmentTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={departments}
        title={"Department List"}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteCate(departmentId)}
      />
    </div>
  );
}

export default DepartmentsList;
