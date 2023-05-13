import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { HiDownload } from "react-icons/hi";
import queryString from "query-string";
import clsx from "clsx";

import styles from "./ImportsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import ImporttTableHead from "./table-head";
import Button from "../../../component/button/Button";
import Pagination from "../../../component/pagination/Pagination";
import Input from "../../../component/input/Input";
import Select from "../../../component/select/Select";

function ImporttsList() {
  const [importId, setImporttId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [imports, setImportts] = useState([]);
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

  async function getImportts() {
    let res = await axiosClient.get("http://localhost:3001/project/import");
    setImportts(res.data.data);
  }

  useEffect(() => {
    async function getCategories() {
      const res = await axiosClient.get(
        "http://localhost:3001/project/category"
      );
      setCategories(res.data.data);
    }


    async function getBrands() {
      const res = await axiosClient.get("http://localhost:3001/project/brand");
      setBrands(res.data.data);
    }

    getCategories();
    getBrands();
    getImportts();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({ ...pagination, totalRows: imports.length }));
  }, [imports.length]);

  useEffect(() => {
    setSeperatePage(
      imports.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > imports.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [imports, pagination.limit, pagination.page]);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteImporttId) => {
    setIsOpen(true);
    setImporttId(deleteImporttId);
  };

  const handleClickDeleteImportt = (deleteImporttId) => {
    axiosClient
      .delete(`http://localhost:3001/project/import/${deleteImporttId}`)
      .then((response) => {
        console.log(response.data);
        setIsOpen(false);

        getImportts();
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

  const renderRows = (importt, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${importt.import_id} - ${index}`}
    >
      <td>{importt.import_id}</td>
      <td>{importt.description}</td>
      <td>{importt.supplier_id}</td>
      {/* <td>{importt.category_id}</td> */}
      <td>{importt.product_id}</td>
      <td>{importt.price}</td>
      <td>{importt.amount}</td>
      <td>
        <Link
          onClick={(e) => {
            if (importt.status === "final_closure") {
              e.preventDefault();
            }
          }}
          className={clsx(styles.iconAction,)}
          to={`/imports/update/${importt.import_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(importt.import_id)}
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
      .get(`http://localhost:3001/project/import?${paramString}`)
      .then((res) => {
        setImportts(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  if (imports.length === 0) {
    return (
      <div>
        <Table loading={true} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>

      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Importt List</h2>
        {/* <Button
          className={styles.downloadBtn}
          type={"button"}
          buttonSize={"btnMedium"}
          buttonStyle={"btnPurpleSolid"}
          onClick={handleClickDownloadAll}
        >
          <HiDownload className={styles.downloadIcon} />
          Export All
        </Button> */}
      </div>
      <Table
        loading={false}
        head={<ImporttTableHead />}
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
        onConfirm={() => handleClickDeleteImportt(importId)}
      />
    </div>
  );
}

export default ImporttsList;
