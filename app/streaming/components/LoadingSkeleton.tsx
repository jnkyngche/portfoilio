import styles from "../streaming.module.css";

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonIcon}></div>
        <div className={styles.skeletonTitle}></div>
      </div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonLine}></div>
        <div className={styles.skeletonLine}></div>
      </div>
      <div className={styles.loadingText}>
        <span className={styles.loadingDot}>●</span>
        <span className={styles.loadingDot}>●</span>
        <span className={styles.loadingDot}>●</span>
        데이터 스트리밍 중...
      </div>
    </div>
  );
}
