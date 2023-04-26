import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

import styles from "./BrandsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import BrandTableHead from "./table-head";
import { ROLES } from "../../../constants";
import Pagination from "../../../component/pagination/Pagination";

function BrandsList() {
  const [brandId, setBrandId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);

  async function getBrands() {
    let res = await axiosClient.get("http://localhost:3001/project/brand");
    setBrands(res.data.data);
  }

  useEffect(() => {
    if (currentUser.role_id === ROLES.SALE_MANAGER) {
      alert("You cannot access this page");
      navigate("/dashboard", { replace: true });
    }
    getBrands();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({
      ...pagination,
      totalRows: brands.length,
    }));
  }, [brands.length]);

  useEffect(() => {
    setSeperatePage(
      brands.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > brands.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [brands, pagination.limit, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteBrandId) => {
    setIsOpen(true);
    setBrandId(deleteBrandId);
  };

  const handleClickDeleteBrand = (deleteBrandId) => {
    axiosClient
      .delete(`http://localhost:3001/project/brand/${deleteBrandId}`)
      .then((response) => {
        console.log(response.data);
        setIsOpen(false);
        getBrands();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (brand, index, onClickDelete) => {
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
        key={`${brand.brand_id} - ${index}`}
      >
        <td>{brand.brand_name}</td>
        <td>{brand.brand_address}</td>
        <td>{brand.manager}</td>
        <td>{brand.phone_number}</td>
        <td>{brand.status}</td>
        <td>{brand.created_date}</td>
        <td>{brand.updated_date}</td>
        {/* <td>{brand.status}</td> */}
        <td>
          <Link
            className={styles.iconAction}
            to={`/brands/update/${brand.brand_id}`}
          >
            <BiEditAlt />
          </Link>
          <RiDeleteBin5Line
            className={styles.iconAction}
            onClick={() => onClickDelete(brand.brand_id)}
          />
        </td>
      </tr>
    );
  };

  if (brands.length === 0) {
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
        head={<BrandTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={seperatePage}
        title={"Brand List"}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />

      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeleteBrand(brandId)}
      />
    </div>
  );
}

export default BrandsList;
