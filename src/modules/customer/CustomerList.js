import React, { useState } from "react";
import CustomersList from "./list/CustomersList";

function CustomerList() {
  //   const [isOpen, setIsOpen] = useState();
  //   const [mode, setMode] = useState("edit");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  return (
    <div>
      <CustomersList
        currentPage={currentPage}
        onCurrentPage={setCurrentPage}
        onPageSize={setPageSize}
      />
    </div>
  );
}

export default CustomerList;
