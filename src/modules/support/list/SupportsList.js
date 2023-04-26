import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./SupportsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import SupportTableHead from "./table-head";
import Pagination from "../../../component/pagination/Pagination";

function SupportsList({ currentPage, onCurrentPage, onPageSize }) {
  const [supportId, setSupportId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [supports, setSupports] = useState([]);
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

  useEffect(() => {
    axiosClient.get("http://localhost:3001/project/support").then((res) => {
      setSupports(res.data.data);
    });
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: supports.length,
    }));
  }, [supports.length]);

  useEffect(() => {
    setSeperatePage(
      supports.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > supports.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [supports, pagination.limit, pagination.page]);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteSupportId) => {
    setIsOpen(true);
    setSupportId(deleteSupportId);
  };

  const handleClickDeleteCate = (deleteSupportId) => {
    axiosClient
      .delete(`http://localhost:3001/project/support/${deleteSupportId}`)
      .then((response) => {
        console.log(response.data);
        setIsOpen(false);
        axiosClient.get("http://localhost:3001/project/support").then((res) => {
          setSupports(res.data.data);
        });      })
      .catch((err) => console.log(err));
  };

  const renderRows = (support, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${support.support_id} - ${index}`}
    >
      <td>{support.support_id}</td>
      <td>{support.name}</td>
      <td>{support.email}</td>
      <td>{support.phone}</td>
      <td>{support.description}</td>
      <td>{support.status}</td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/supports/update/${support.support_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(support.support_id)}
        />
      </td>
    </tr>
  );

  if (supports.length === 0) {
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
        head={<SupportTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={seperatePage}
        title={"Support List"}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />
      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteCate(supportId)}
      />
    </div>
  );
}

export default SupportsList;
