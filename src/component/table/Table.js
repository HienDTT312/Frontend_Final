import React, { useEffect, useMemo } from "react";

import Spinner from "../spinner/Spinner";
import styles from "./Table.module.css";

function Table({
  loading,
  head,
  data,
  renderRows,
  onClickDeleteButton,
  title,
  // currentPage,
  // pageSize,
  // onPageSize,
  // onCurrentPage,
  // ...props
}) {
  // const currentTableData = useMemo(() => {
  //   const firstPageIndex = (currentPage - 1) * pageSize;
  //   const lastPageIndex = firstPageIndex + pageSize;
  //   return data.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage, data]);

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td>
            <Spinner />
            <p>Loading data ...</p>
          </td>
        </tr>
      );
    }
    if (data.length === 0 || !data) {
      return (
        <tr>
          <td>No data</td>
        </tr>
      );
    }
    return data.map((item, index) =>
      renderRows(item, index, onClickDeleteButton)
    );
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <table className={styles.table}>
        {head}
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
}

Table.defaultProps = {
  loading: false,
};

export default Table;
