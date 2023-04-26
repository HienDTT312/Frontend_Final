import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./CustomersList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import CustomerTableHead from "./table-head";
import { ROLES } from "../../../constants";
import Pagination from "../../../component/pagination/Pagination";

function CustomersList({ currentPage, onCurrentPage, onPageSize }) {
  const [customerId, setCustomerId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  async function getCustomers() {
    let res = await axiosClient.get("http://localhost:3001/project/customer/");
    setCustomers(res.data.data.rows);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: customers.length,
    }));
  }, [customers.length]);

  useEffect(() => {
    setSeperatePage(
      customers.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > customers.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [customers, pagination.limit, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteCustomerId) => {
    setIsOpen(true);
    setCustomerId(deleteCustomerId);
  };

  const handleClickDeleteCustomer = (deleteCustomerId) => {
    axiosClient
      .delete(`http://localhost:3001/project/customer/${deleteCustomerId}`)
      .then((response) => {
        console.log(response.data);
        setIsOpen(false);
        getCustomers();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (customer, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${customer.user_id} - ${index}`}
    >
      <td>
        <img
          src={`http://localhost:3001/${customer.avatar}`}
          alt="Avatar"
          className={styles.avatarImg}
        />
      </td>
      <td>{customer.full_name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      <td>
        {customer.profile_status ? (
          <span className={styles.badgeActive}>Active</span>
        ) : (
          <span className={styles.badgeDisabled}>Disabled</span>
        )}
      </td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/customers/update/${customer.email}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(customer.user_id)}
        />
      </td>
    </tr>
  );

  if (customers.length === 0) {
    return (
      <div className={styles.container}>
        <Table loading={true} />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <Table
          loading={false}
          head={<CustomerTableHead />}
          renderRows={renderRows}
          onClickDeleteButton={onClickDelete}
          data={seperatePage}
          title="Customer List"
        />
        <Pagination pagination={pagination} onPageChage={handlePageChange} />

        <Popup
          isOpen={isOpen}
          title="Confirm Infomation"
          message="Are you sure to delete this record?"
          onClose={handleClickClose}
          onConfirm={() => handleClickDeleteCustomer(customerId)}
        />
      </div>
    );
  }
}

export default CustomersList;
