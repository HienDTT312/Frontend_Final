import React, { useState } from "react";
import UsersList from "./list/UsersList";

function UserList() {
  //   const [isOpen, setIsOpen] = useState();
  //   const [mode, setMode] = useState("edit");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  return (
    <div>
      <UsersList
        currentPage={currentPage}
        onCurrentPage={setCurrentPage}
        onPageSize={setPageSize}
      />
    </div>
  );
}

export default UserList;
