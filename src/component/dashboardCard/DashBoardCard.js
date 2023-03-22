import React from "react";

import styles from "./DashboardCard.module.css";
import bubbleImg from "../../assets/background/circle-image.svg";

export default function DashBoardCard({ icon, title, data, extraData }) {
  return (
    <div className={styles.body}>
      <img className={styles.bgBubble} src={bubbleImg} alt="Bubble Img" />
      <h4 className={styles.title}>
        {title}
        <span className={styles.icon}>{icon}</span>
      </h4>
      <h2 className={styles.data}>{data}</h2>
      <h6 className={styles.extra}>{extraData}</h6>
    </div>
  );
}
