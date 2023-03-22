import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import styles from "./SidebarDetail.module.css";

export default function SidebarDetail({ subItem }) {
  return (
    <ul className={styles.detailContainer}>
      {subItem.map((item, index) => (
        <li key={`${item.title} ${index}`} className={styles.detailItem}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `${styles.detailLink}` + (isActive ? ` ${styles.active}` : " ")
            }
          >
            <span className={styles.detailIcon}>
              <HiOutlineArrowNarrowRight />
            </span>
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
