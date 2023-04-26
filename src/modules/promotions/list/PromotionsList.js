import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { HiDownload } from "react-icons/hi";
import queryString from "query-string";
import clsx from "clsx";

import styles from "./PromotionsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import PromotionTableHead from "./table-head";
import Button from "../../../component/button/Button";
import Pagination from "../../../component/pagination/Pagination";
import Input from "../../../component/input/Input";
import Select from "../../../component/select/Select";

function PromotionsList() {
  const [promotionId, setPromotionId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 1,
  });
  const [seperatePage, setSeperatePage] = useState([]);
  const [brands, setBrands] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  async function getPromotions() {
    let res = await axiosClient.get("http://localhost:3001/project/promotion");
    setPromotions(res.data.data);
  }

  useEffect(() => {
    async function getCategories() {
      const res = await axiosClient.get(
        "http://localhost:3001/project/category"
      );
      setCategories(res.data.data);
    }

    async function getDepartments() {
      const res = await axiosClient.get(
        "http://localhost:3001/project/department"
      );
      setDepartments(res.data.data);
    }

    async function getBrands() {
      const res = await axiosClient.get("http://localhost:3001/project/brand");
      setBrands(res.data.data);
    }

    getCategories();
    getDepartments();
    getBrands();
    getPromotions();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({ ...pagination, totalRows: promotions.length }));
  }, [promotions.length]);

  useEffect(() => {
    setSeperatePage(
      promotions.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > promotions.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [promotions, pagination.limit, pagination.page]);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deletePromotionId) => {
    setIsOpen(true);
    setPromotionId(deletePromotionId);
  };

  const handleClickDeletePromotion = (deletePromotionId) => {
    axiosClient
      .delete(`http://localhost:3001/project/promotion/${deletePromotionId}`)
      .then((response) => {
        console.log(response.data);
        setIsOpen(false);

        getPromotions();
      })
      .catch((err) => console.log(err));
  };

  const handleClickDownloadAll = () => {

    axiosClient
      .get("http://localhost:3001/project/csv", { responseType: "blob" })
      .then((res) => {
        // let headerLine = res.data.headers['content-disposition'];
        const headerval = res.headers['content-disposition'];
				const filename = headerval.split(';')[1].split('=')[1].replace('"', '').replace('"', '');

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename); //or any other extension
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err));
  };

  const renderRows = (promotion, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${promotion.promotion_id} - ${index}`}
    >
      <td>{promotion.title}</td>
      <td>{promotion.description}</td>
      <td>{promotion.category_id}</td>
      <td>{promotion.discount}</td>
      <td>{promotion.supplier_id}</td>
      <td>
        <Link
          className={styles.iconAction}
          to={`/promotions/${promotion.promotion_id}/documents`}
        >
          <ImEye />
        </Link>
        <Link
          onClick={(e) => {
            if (promotion.status === "final_closure") {
              e.preventDefault();
            }
          }}
          className={clsx(styles.iconAction, promotion.status === "final_closure" && styles.active)}
          to={`/promotions/update/${promotion.promotion_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(promotion.promotion_id)}
        />
      </td>
    </tr>
  );

  const handleOnChange = (target) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

  const handleOnSubmitFilter = (e) => {
    e.preventDefault();
    const paramString = queryString.stringify(filters);
    axiosClient
      .get(`http://localhost:3001/project/promotion?${paramString}`)
      .then((res) => {
        setPromotions(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  if (promotions.length === 0) {
    return (
      <div>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <h2>Filter</h2>
        <form onSubmit={handleOnSubmitFilter} className={styles.filterForm}>
          <div className={styles.filterContent}>
            <div className={styles.left}>
              <Input
                onChange={handleOnChange}
                config={{
                  name: "title",
                  type: "text",
                  placeholder: "Type your title",
                  className: styles.filterInput,
                }}
              />
              <Input
                onChange={handleOnChange}
                config={{
                  name: "full_name",
                  type: "text",
                  placeholder: "Type Full Name",
                  className: styles.filterInput,
                }}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.rightFirst}>
                <Select
                  name="category_id"
                  defaultValue={""}
                  onChange={handleOnChange}
                  required={false}
                >
                  <option value="">Select category</option>
                  {categories.map((item, index) => (
                    <option
                      value={item.category_id}
                      key={`${item.name} ${index}`}
                    >
                      {item.category_name}
                    </option>
                  ))}
                </Select>
                <Select
                  name="status"
                  defaultValue={""}
                  onChange={handleOnChange}
                  required={false}
                >
                  <option value="">Select status</option>
                  <option value="first_closure">First Closure</option>
                  <option value="final_closure">Final Closure</option>
                </Select>
              </div>
              <div className={styles.rightSecond}>
                <Select
                  name="department_id"
                  defaultValue={""}
                  required={false}
                  onChange={handleOnChange}
                >
                  <option value="">Select department</option>
                  {departments.map((item, index) => (
                    <option
                      value={item.department_id}
                      key={`${item.department_name} ${index}`}
                    >
                      {item.department_name}
                    </option>
                  ))}
                </Select>
                <Select
                  name="brand_id"
                  defaultValue={""}
                  required={false}
                  onChange={handleOnChange}
                >
                  <option value="">Select brand</option>
                  {brands.map((item, index) => (
                    <option
                      value={item.brand_id}
                      key={`${item.brand_name} ${index}`}
                    >
                      {item.brand_name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <Button
            className={styles.filterBtn}
            type={"submit"}
            buttonSize={"btnMedium"}
            buttonStyle={"btnPrimarySolid"}
          >
            Filter
          </Button>
          <Button
            className={styles.resetBtn}
            type={"submit"}
            buttonSize={"btnMedium"}
            buttonStyle={"btnPrimarySolid"}
            onClick={() => getPromotions()}
          >
            Update Table
          </Button>
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Promotion List</h2>
        <Button
          className={styles.downloadBtn}
          type={"button"}
          buttonSize={"btnMedium"}
          buttonStyle={"btnPurpleSolid"}
          onClick={handleClickDownloadAll}
        >
          <HiDownload className={styles.downloadIcon} />
          Export All
        </Button>
      </div>
      <Table
        loading={false}
        head={<PromotionTableHead />}
        renderRows={renderRows}
        onClickDeleteButton={onClickDelete}
        data={seperatePage}
      />
      <Pagination pagination={pagination} onPageChage={handlePageChange} />
      <Popup
        isOpen={isOpen}
        title="Confirm Information"
        message="Are you sure to delete this record?"
        onClose={handleClickClose}
        onConfirm={() => handleClickDeletePromotion(promotionId)}
      />
    </div>
  );
}

export default PromotionsList;
