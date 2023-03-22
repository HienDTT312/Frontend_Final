import React from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import styles from "./Pagination.module.css";
import Button from "../button/Button";

function Pagination({ pagination, onPageChage }) {
  const { page, limit, totalRows } = pagination;
  const totalPages = Math.ceil(totalRows / limit);
  const handlePageChange = (newPage) => {
    if (onPageChage) {
      onPageChage(newPage);
    }
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.pagiBtn}
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <MdNavigateBefore className={styles.pagiIcon} />
      </Button>
      {Array.from(Array(totalPages).keys()).map((item, index, arr) => {
        return (
          <Button
            className={styles.pagiBtn}
            disabled={page === index + 1}
            key={`Pagination ${index}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        );
      })}
      <Button
        className={styles.pagiBtn}
        disabled={page >= totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <MdNavigateNext className={styles.pagiIcon} />
      </Button>
    </div>
  );
}

export default Pagination;
