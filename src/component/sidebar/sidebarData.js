import { MdManageAccounts, MdPolicy } from "react-icons/md";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoMedkit } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

const SidebarAdmin = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiFillHome />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Brand",
    path: "/brands",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/brands/view",
      },
      {
        title: "Create",
        path: "/brands/create",
      },
    ],
  },
  {
    title: "Supplier",
    path: "/suppliers",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/suppliers/view",
      },
      {
        title: "Create",
        path: "/suppliers/create",
      },
    ],
  },
  {
    title: "Category",
    path: "/categories",
    icon: <BiCategoryAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/categories/view",
      },
      {
        title: "Create",
        path: "/categories/create",
      },
    ],
  },
  {
    title: "User",
    path: "/users",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/users/view",
      },
      {
        title: "Create",
        path: "/users/create",
      },
    ],
  },
  {
    title: "Customer",
    path: "/customers",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/customers/view",
      },
      {
        title: "Create",
        path: "/customers/create",
      },
    ],
  },
  {
    title: "Transaction",
    path: "/transactions",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/transactions/view",
      },
      {
        title: "Create",
        path: "/transactions/create",
      },
    ],
  },
  {
    title: "Import",
    path: "/imports",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/imports/view",
      },
      {
        title: "Create",
        path: "/imports/create",
      },
    ],
  },
  {
    title: "Promotions",
    path: "/promotions",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/promotions/view",
      },
      {
        title: "Create",
        path: "/promotions/create",
      },
    ],
  },
  {
    title: "Product",
    path: "/products",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/products/view",
      },
      {
        title: "Create",
        path: "/products/create",
      },
    ],
  },
  {
    title: "Aggrement",
    path: "/aggrements",
    icon: <MdPolicy />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/aggrements/view",
      },
      {
        title: "Create",
        path: "/aggrements/create",
      },
    ],
  },
  {
    title: "Support",
    path: "/supports",
    icon: <MdPolicy />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/supports/view",
      },
    ],
  },
];

const SidebarQAM = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiFillHome />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Brand",
    path: "/brands/view",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Supplier",
    path: "/suppliers/view",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Category",
    path: "/categories/view",
    icon: <BiCategoryAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/categories/view",
      },
      {
        title: "Create",
        path: "/categories/create",
      },
    ],
  },
  {
    title: "User",
    path: "/users/view",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Product",
    path: "/products/view",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Aggrement",
    path: "/aggrements/view",
    icon: <MdPolicy />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];

const SidebarQAC = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiFillHome />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Brand",
    path: "/brands/view",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Product",
    path: "/products/view",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];

const SidebarStaff = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <AiFillHome />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Brand",
    path: "/brands/view",
    icon: <BsCalendar2Date />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Category",
    path: "/categories/view",
    icon: <BiCategoryAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "User",
    path: "/users/view",
    icon: <MdManageAccounts />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
  {
    title: "Product",
    path: "/products",
    icon: <FaRegLightbulb />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: "View",
        path: "/products/view",
      },
      {
        title: "Create",
        path: "/products/create",
      },
    ],
  },
  {
    title: "Aggrement",
    path: "/aggrement/view",
    icon: <MdPolicy />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
  },
];

export { SidebarAdmin, SidebarQAM, SidebarQAC, SidebarStaff };
