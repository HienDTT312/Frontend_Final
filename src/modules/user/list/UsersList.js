import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./UsersList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import UserTableHead from "./table-head";
import { ROLES } from "../../../constants";
import Pagination from "../../../component/pagination/Pagination";

function UsersList({ currentPage, onCurrentPage, onPageSize }) {
  const [userId, setUserId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  async function getUsers() {
    let res = await axiosClient.get("http://localhost:3001/service1/user/");
    setUsers(res.data.data.rows);
  }

  useEffect(() => {
    if (currentUser.role_id === ROLES.SALE_MANAGER) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    getUsers();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: users.length,
    }));
  }, [users.length]);

  useEffect(() => {
    setSeperatePage(
      users.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > users.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [users, pagination.limit, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteUserId) => {
    setIsOpen(true);
    setUserId(deleteUserId);
  };

  const handleClickDeleteUser = (deleteUserId) => {
    axiosClient
      .delete(`http://localhost:3001/service1/user/${deleteUserId}`)
      .then((response) => {
        console.log(response.data);
        getUsers();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (user, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${user.user_id} - ${index}`}
    >
      <td>
        <img
          src={`http://localhost:3001/${user.avatar}`}
          alt="Avatar"
          className={styles.avatarImg}
        />
      </td>
      <td>{user.full_name}</td>
      <td>{user.username}</td>
      <td>{user.phone}</td>
      <td>
        {user.profile_status ? (
          <span className={styles.badgeActive}>Active</span>
        ) : (
          <span className={styles.badgeDisabled}>Disabled</span>
        )}
      </td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/users/update/${user.username}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(user.user_id)}
        />
      </td>
    </tr>
  );

  if (users.length === 0) {
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
          head={<UserTableHead />}
          renderRows={renderRows}
          onClickDeleteButton={onClickDelete}
          data={seperatePage}
          title="User List"
        />
        <Pagination pagination={pagination} onPageChage={handlePageChange} />

        <Popup
          isOpen={isOpen}
          title="Confirm Infomation"
          message="Are you sure to delete this record?"
          onClose={handleClickClose}
          onConfirm={() => handleClickDeleteUser(userId)}
        />
      </div>
    );
  }
}

export default UsersList;
