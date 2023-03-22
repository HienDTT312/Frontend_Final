import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./SidebarItem.module.css";
import SidebarDetail from "../sidebarDetail/SidebarDetail";

const styleLinks = {};

export default function SidebarItem({ item, sidebarStatusExpand }) {
  const [detail, setDetail] = useState(false);
  // const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   if (item.subNav) {
  //     setDetail(true);
  //   }
  // }, []);

  const toggleDetail = () => {
    if (sidebarStatusExpand) {
      setDetail(!detail);
    }
  };

  if (!item.subNav) {
    return (
      <div
        className={clsx(
          styles.sidebarItem,
          !sidebarStatusExpand ? styles.sidebarItemCollapse : ""
        )}
      >
        <NavLink
          to={item.path}
          style={styleLinks}
          className={({ isActive }) =>
            `${styles.sidebarLink}` + (isActive ? ` ${styles.active}` : " ")
          }
        >
          <span className={clsx(styles.sidebarLable)}>{item.title}</span>
          <span className={clsx(styles.sidebarIcon)}>{item.icon}</span>
        </NavLink>
      </div>
    );
  } else {
    return (
      <div
        className={clsx(
          styles.sidebarWithSubNav,
          sidebarStatusExpand ? "" : styles.sbSubNavCollapse
        )}
      >
        <div className={clsx(styles.sidebarItem)} onClick={toggleDetail}>
          <div className={clsx(styles.sidebarLable)}>
            <span>{item.title}</span>
            {!sidebarStatusExpand && (
              <div className={styles.subNavContainerCollapse}>
                <SidebarDetail subItem={item.subNav} />
              </div>
            )}
          </div>
          <div className={clsx(styles.iconsContainer)}>
            {sidebarStatusExpand && (
              <span className={clsx(styles.sidebarIcon)}>
                {!detail ? item.iconClosed : item.iconOpened}
              </span>
            )}
            <span className={clsx(styles.sidebarIcon)}>{item.icon}</span>
          </div>
        </div>
        {/* Subnav */}
        <div
          className={clsx(
            styles.subNavContainer,
            detail ? `${styles.active}` : ` `
          )}
        >
          <SidebarDetail subItem={item.subNav} />
        </div>
      </div>
    );
  }
}
