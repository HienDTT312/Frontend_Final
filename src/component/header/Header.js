import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { GoThreeBars } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdFullscreen,
} from "react-icons/md";
import { ImStack } from "react-icons/im";
import { BiEnvelope } from "react-icons/bi";
import { AiOutlineBell } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import clsx from "clsx";

import styles from "./Header.module.css";
import Search from "../search/Search";

export default function Header({ onClickSlide, onClickExpand, statusExpand }) {
  const [search, setSearch] = useState("");
  const [expandUser, setExpandUser] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const configInput = (id, className, nameAtt, type, value, placeholder) => {
    return {
      id: id,
      className: className,
      name: nameAtt,
      type: type,
      value: value,
      placeholder: placeholder,
    };
  };

  const handleOnChange = (newData) => {
    setSearch(newData);
  };

  const handleClickExpand = () => {
    onClickExpand();
  };

  const handleClickSlide = () => {
    onClickSlide();
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Link
          to="/dashboard"
          replace
          style={{ width: statusExpand ? "260px" : "70px" }}
          className={clsx(styles.logo)}
        >
          <ImStack style={{ fontSize: "26px" }} />
          {statusExpand && <p className={clsx(styles.logoText)}>Project</p>}
        </Link>
      </div>
      <div className={styles.right}>
        <div className={styles.flex}>
          <GoThreeBars
            onClick={handleClickExpand}
            className={clsx(styles.iconLeft, styles.iconExpand)}
          />
          <FiSearch className={styles.iconLeft} />
          <Search
            onChange={handleOnChange}
            config={configInput(
              "search",
              `${styles.searchInput}`,
              "search",
              "search",
              search,
              "Search Product"
            )}
          />
        </div>
        <div
          onClick={() => setExpandUser(!expandUser)}
          className={clsx(styles.user, expandUser ? styles.expandUser : "")}
        >
          <img
            src={`http://localhost:3001/${currentUser.avatar}`}
            alt="Avatar user"
          />
          <p>{currentUser.full_name}</p>
          {!expandUser ? (
            <MdKeyboardArrowDown className={styles.iconRight} />
          ) : (
            <MdKeyboardArrowUp className={styles.iconRight} />
          )}
          <div className={styles.subNav}>
            <Link className={styles.subNavLink} to="/users/profile">
              <CgProfile className={styles.subNavIcon} />
              My profile
            </Link>
            <Link className={styles.subNavLink} to="/users/profile">
              <IoMdSettings className={styles.subNavIcon} />
              Settings
            </Link>
          </div>
        </div>
        <IconContext.Provider value={{ className: styles.iconsAction }}>
          <MdFullscreen className={styles.iconFull} />
          <BiEnvelope className={styles.iconHeader} />
          <AiOutlineBell className={styles.iconHeader} />
          <BsPower className={styles.iconHeader} onClick={logout} />
          <GoThreeBars
            onClick={handleClickSlide}
            className={clsx(styles.iconLeft, styles.iconSlide)}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
}
