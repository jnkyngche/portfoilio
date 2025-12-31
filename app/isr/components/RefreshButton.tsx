"use client";

import styles from "../isr.module.css";

export default function RefreshButton() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <button onClick={handleRefresh} className={styles.refreshButton}>
      페이지 새로고침
    </button>
  );
}

