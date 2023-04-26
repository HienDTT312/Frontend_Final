import axiosClient from "../../../apis/axios.config";
import React, { useState, useEffect, Fragment, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiOutlineFile,
  AiOutlineCloudUpload,
  AiFillCloseCircle,
  AiFillFile,
} from "react-icons/ai";
import clsx from "clsx";

import styles from "./ImportForm.module.css";
import Input from "../../../component/input/Input";
import Button from "../../../component/button/Button";
import Spinner from "../../../component/spinner/Spinner";
import Select from "../../../component/select/Select";
import Preview from "../../../component/preview/Preview";
import checkRole from "../../../helpers/checkRole";
import Popup from "../../../component/popup/Popup";

function ImportForm({ mode }) {
  const navigate = useNavigate();
  const { importtId } = useParams();
  const [importt, setImport] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [agreements, setAggrements] = useState([]);
  const [newDocuments, setNewDocuments] = useState([]);
  const [oldDocsLength, setOldDocsLength] = useState(0);
  const [agree, setAgree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Body for agreement popups
  let body;

  async function getCategories() {
    const res = await axiosClient.get(
      `http://localhost:3001/project/category`
    );
    setCategories(res.data.data);
  }

  async function getProducts() {
    const res = await axiosClient.get(
      `http://localhost:3001/project/product`
    );
    setProducts(res.data.data);
  }

  async function getSuppliers() {
    const res = await axiosClient.get(
      `http://localhost:3001/project/supplier`
    );
    setSuppliers(res.data.data);
  }

  async function getAggrements() {
    const res = await axiosClient.get(
      "http://localhost:3001/project/aggrement"
    );
    setAggrements(res.data.data);
  }

  useEffect(() => {
    getAggrements();
    getCategories();
    getProducts();
    getSuppliers();
    async function getOneImport() {
      const res = await axiosClient.get(
        `http://localhost:3001/project/import/${importtId}`
      );
      setImport(res.data.data);
      setOldDocsLength(res.data.data.documents.length);
      if (res.data.data.status === "final_closure") {
        alert(
          "The status of importt is final closure, You can not update this importt"
        );
        navigate(-1);
      }
    }

    if (mode === "update") {
      getOneImport();
    } else if (mode === "create") {
      return setImport({
        title: "",
        documents: [],
        description: "",
        category_id: "",
        supplier_name: "",
        product_name: "",
      });
    }
  }, []);

  // Get data of agreements to pass through popup
  if (agreements.length > 0) {
    body = (
      <div className={styles.agreeContainer}>
        {agreements.map((agree, index) => (
          <div
            className={styles.agreeItem}
            key={`${agree.aggrement_name} ${index}`}
          >
            <h3>
              {index + 1}. {agree.aggrement_name}
            </h3>
            <p>{agree.description}</p>
          </div>
        ))}
      </div>
    );
  } else {
    body = <p>No data</p>;
  }

  const configInput = (
    id,
    className,
    nameAtt,
    type,
    value,
    placeholder,
    accept,
    multiple,
    disabled,
    hidden,
    required,
    checked
  ) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
      accept: accept,
      disabled: disabled,
      multiple: multiple,
      hidden: hidden,
      required: required,
      checked: checked,
    };
  };

  const renderPreview = (doc, index, docs, onClickDownload) => {
    if (index === docs.length - 1) {
      return (
        <Fragment key={`${index} ${docs}`}>
          <div className={styles.previewItem}>
            <AiFillFile className={styles.iconThumbnail} />
            <div className={styles.fileNameContainer}>
              <AiOutlineFile className={styles.previewIcon} />
              <span className={styles.fileNameContent}>
                {mode === "update" ? doc.document : doc.name}
              </span>
            </div>
            <AiFillCloseCircle
              onClick={() =>
                handleDeleteFile(
                  index,
                  index <= oldDocsLength - 1 ? doc.document_id : undefined
                )
              }
              className={styles.deleteIcon}
            />
          </div>
          <label
            htmlFor="documents"
            className={clsx(styles.previewItem, styles.uploadBtn)}
          >
            <AiOutlineCloudUpload className={styles.uploadIcon} />
            <p>Upload</p>
            <Input
              onChange={handleOnFileChange}
              config={configInput(
                "documents",
                styles.fileInput,
                "documents",
                "file",
                "",
                "",
                "*",
                true,
                false,
                true
              )}
            />
          </label>
        </Fragment>
      );
    } else {
      return (
        <div className={styles.previewItem} key={`${index} ${docs}`}>
          <AiFillFile className={styles.iconThumbnail} />
          <div className={styles.fileNameContainer}>
            <AiOutlineFile className={styles.previewIcon} />
            <span className={styles.fileNameContent}>
              {mode === "update" ? doc.document : doc.name}
            </span>
          </div>
          <AiFillCloseCircle
            onClick={() =>
              handleDeleteFile(
                index,
                index <= oldDocsLength - 1 ? doc.document_id : undefined
              )
            }
            className={styles.deleteIcon}
          />
        </div>
      );
    }
  };

  const handleOnFileChange = (target) => {
    for (let file of target.files) {
      setImport((importt) => {
        return { ...importt, documents: [...importt.documents, file] };
      });
      setNewDocuments((newDocuments) => [...newDocuments, file]);
    }
  };

  const handleDeleteFile = (indexItem, docId) => {
    // Delete old document of importt
    if (docId) {
      axiosClient
        .delete(`http://localhost:3001/project/document/${docId}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setOldDocsLength((oldDocsLength) => oldDocsLength - 1);
    }
    setImport((importt) => {
      return {
        ...importt,
        documents: importt.documents.filter((item, index) => {
          return index !== indexItem;
        }),
      };
    });
    return setNewDocuments(
      newDocuments.filter((item, index) => index !== indexItem)
    );
  };

  const handleOnChange = (target) => {
    console.log('target', target.name + 'value', target.value)
    setImport({ ...importt, [target.name]: target.value });
  };

  const handleOnChangeTextArea = ({ target }) => {
    setImport({ ...importt, [target.name]: target.value });
  };

  const handleOnChangeCheck = (target) => {
    setAgree(!agree);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", importt.title);
    formData.append("price", importt.price);
    formData.append("amount", importt.amount);
    formData.append("description", importt.description);
    formData.append("import_id", importt.import_id);
    formData.append("amount", importt.amount);
    formData.append("product_id", importt.product_id);
    formData.append("supplier_id", importt.supplier_id);
    if (mode === "create") {
      axiosClient
        .post(`http://localhost:3001/project/import`, formData)
        .then((res) => navigate("/imports/view", { replace: true }))
        .catch((err) => console.log(err));
    } else {
      formData.append("import_id", importt.import_id);
      axiosClient
        .put(`http://localhost:3001/project/import/${importt.import_id}`, formData)
        .then((res) => navigate("/imports/view", { replace: true }))
        .catch((err) => console.log(err));
    }
  };

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleClickAgree = () => {
    setIsOpen(false);
    setAgree(true);
  };

  if (!importt) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>
        {mode === "update" ? `Update Import` : `Create Import`}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "title",
              styles.formInput,
              "title",
              "text",
              importt.title,
              "Your Title",
              undefined
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "price",
              styles.formInput,
              "price",
              "text",
              importt.price,
              "Your price",
              undefined
            )}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>
            Amount
          </label>
          <Input
            onChange={handleOnChange}
            config={configInput(
              "amount",
              styles.formInput,
              "amount",
              "text",
              importt.amount,
              "Your amount",
              undefined
            )}
          />
        </div>
        {/* Category */}
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <Select
            name="category_id"
            defaultValue={importt.category_id !== "" ? importt.category_id : ""}
            id="category"
            onChange={handleOnChange}
          >
            <option value="" disabled hidden>
              Choose your category...
            </option>
            {categories.map((category, index) => (
              <option
                key={`${category.name} ${index}`}
                value={category.category_id}
              >
                {category.category_name}
              </option>
            ))}
          </Select>
        </div>
         {/* Product */}
         <div className={styles.formGroup}>
          <label htmlFor="product" className={styles.label}>
            Product
          </label>
          <Select
            name="product_id"
            defaultValue={importt.product_id !== "" ? importt.product_id : ""}
            id="product"
            onChange={handleOnChange}
          >
            <option value="" disabled hidden>
              Choose your product...
            </option>
            {products.map((product, index) => (
              <option
                key={`${product.product_id} ${index}`}
                value={product.product_id}
              >
                {product.title}
              </option>
            ))}
          </Select>
        </div>
        {/* Product */}
        <div className={styles.formGroup}>
          <label htmlFor="supplier" className={styles.label}>
            Supplier
          </label>
          <Select
            name="supplier_id"
            defaultValue={importt.supplier_id !== "" ? importt.supplier_id : ""}
            id="supplier"
            onChange={handleOnChange}
          >
            <option value="" disabled hidden>
              Choose your supplier...
            </option>
            {suppliers.map((supplier, index) => (
              <option
                key={`${supplier.supplier_id} ${index}`}
                value={supplier.supplier_id}
              >
                {supplier.supplier_name}
              </option>
            ))}
          </Select>
        </div>
        {/* Description */}
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            rows={4}
            onChange={handleOnChangeTextArea}
            name="description"
            placeholder="Your description"
            className={styles.description}
            id="description"
            value={importt.description}
          ></textarea>
        </div>
        {/* Products */}
        <Button
          type={"submit"}
          buttonSize={"btnLarge"}
          buttonStyle={"btnPurpleSolid"}
        >
          Confirm
        </Button>
      </form>
    </div>
  );
}

export default ImportForm;
