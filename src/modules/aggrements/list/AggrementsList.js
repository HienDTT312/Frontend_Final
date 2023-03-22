import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./AggrementsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import AggrementTableHead from "./table-head";
import { ROLES } from "../../../constants";
import Pagination from "../../../component/pagination/Pagination";

function AggrementsList() {
  const [aggrementId, setCateID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [aggrements, setAggrements] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  async function getAggrements() {
    let res = await axiosClient.get(
      "http://localhost:3001/service1/aggrement"
    );
    setAggrements(res.data.data);
  }

  useEffect(() => {
    if (currentUser.role_id === ROLES.SALE_MANAGER) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    getAggrements();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: aggrements.length,
    }));
  }, [aggrements.length]);

  useEffect(() => {
    setSeperatePage(
      aggrements.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > aggrements.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [aggrements, pagination.limit, pagination.page]);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteCateId) => {
    setIsOpen(true);
    setCateID(deleteCateId);
  };

  const handleClickDeleteCate = (deleteCateId) => {
    axiosClient
      .delete(`http://localhost:3001/service1/aggrement/${deleteCateId}`)
      .then((response) => {
        console.log(response.data);
        getAggrements();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (aggrement, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${aggrement.aggrement_id} - ${index}`}
    >
      <td>{aggrement.aggrement_name}</td>
      <td>{aggrement.description}</td>
      <td>
        {aggrement.status ? (
          <span className={styles.badgeActive}>Active</span>
        ) : (
          <span className={styles.badgeDisabled}>Disabled</span>
        )}
      </td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/aggrements/update/${aggrement.aggrement_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(aggrement.aggrement_id)}
        />
      </td>
    </tr>
  );

  if (aggrements.length === 0) {
    return (
      <div className={styles.container}>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Table
        loading={false}
        head={<AggrementTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={seperatePage}
        title={"Aggrement List"}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />
      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteCate(aggrementId)}
      />
    </div>
  );
}

export default AggrementsList;
