import React, { useEffect, useState } from "react";
import axiosClient from "../../../apis/axios.config";
import { Link } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ImEye } from "react-icons/im";
import { HiDownload } from "react-icons/hi";
import queryString from "query-string";
import clsx from "clsx";

import styles from "./ProductsList.module.css";
import Popup from "../../../component/popup/Popup";
import Table from "../../../component/table/Table";
import ProductTableHead from "./table-head";
import Button from "../../../component/button/Button";
import Pagination from "../../../component/pagination/Pagination";
import Input from "../../../component/input/Input";
import Select from "../../../component/select/Select";

function ProductsList() {
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
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

  async function getProducts() {
    let res = await axiosClient.get("http://localhost:3001/project/product");
    setProducts(res.data.data);
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
    // getDepartments();
    getBrands();
    getProducts();
  }, []);

  useEffect(() => {
    setPagination((pagination) => ({ ...pagination, totalRows: products.length }));
  }, [products.length]);

  useEffect(() => {
    setSeperatePage(
      products.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit > products.length
          ? undefined
          : pagination.page * pagination.limit
      )
    );
  }, [products, pagination.limit, pagination.page]);

  const handleClickClose = () => setIsOpen(false);

  const onClickDelete = (deleteProductId) => {
    setIsOpen(true);
    setProductId(deleteProductId);
  };

  const handleClickDeleteProduct = (deleteProductId) => {
    axiosClient
      .delete(`http://localhost:3001/project/product/${deleteProductId}`)
      .then((response) => {
        console.log(response.data);
        setIsOpen(false);

        getProducts();
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

  const renderRows = (product, index, onClickDelete) => (
    <tr
      style={{ backgroundColor: (index + 1) % 2 !== 0 ? "#f2edf3" : "#fff" }}
      key={`${product.product_id} - ${index}`}
    >
      <td>{product.title}</td>
      <td>{product.supplier_name}</td>
      <td>{product.brand_name}</td>
      <td>{product.category_name}</td>
      <td>{product.price}</td>
      <td>{product.author}</td>
      <td>{product.amount}</td>

      <td>
        <Link
          className={styles.iconAction}
          to={`/products/${product.product_id}/documents`}
        >
          <ImEye />
        </Link>
        <Link
          onClick={(e) => {
            if (product.status === "final_closure") {
              e.preventDefault();
            }
          }}
          className={clsx(styles.iconAction, product.status === "final_closure" && styles.active)}
          to={`/products/update/${product.product_id}`}
        >
          <BiEditAlt />
        </Link>
        <RiDeleteBin5Line
          className={styles.iconAction}
          onClick={() => onClickDelete(product.product_id)}
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
      .get(`http://localhost:3001/project/product?${paramString}`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  if (products.length === 0) {
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
                  placeholder: "Type Description",
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
                  name="brand_id"
                  defaultValue={""}
                  required={false}
                  onChange={handleOnChange}
                >
                  <option value="">Select brand</option>
                  {brands.map((item, index) => (
                    <option
                      value={item.brand_name}
                      key={`${item.brand_name} ${index}`}
                    >
                      {item.brand_name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className={styles.rightSecond}>


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
            onClick={() => getProducts()}
          >
            Update Table
          </Button>
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Product List</h2>
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
        head={<ProductTableHead />}
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
        onConfirm={() => handleClickDeleteProduct(productId)}
      />
    </div>
  );
}

export default ProductsList;
