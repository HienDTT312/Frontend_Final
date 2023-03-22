const checkRole = (roleId) => {
  switch (roleId) {
    case 1:
      return "Staff";
    case 2:
      return "Admin";
    case 3:
      return "QA Coordinator";
    case 4:
      return "QA Manager";
    default:
      return "Invalid Role";
  }
};

export default checkRole;
