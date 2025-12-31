import styles from "../streaming.module.css";

interface SlowDataComponentProps {
  delay: number;
  title: string;
  color?: string;
}

export default async function SlowDataComponent({
  delay,
  title,
  color = "#22c55e",
}: SlowDataComponentProps) {
  // 지정된 지연 시간 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, delay * 1000));

  const timestamp = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className={styles.dataContainer}>
      <div
        className={styles.successMessage}
        style={{
          background: `rgba(${
            color === "#22c55e"
              ? "34, 197, 94"
              : color === "#3b82f6"
              ? "59, 130, 246"
              : "147, 51, 234"
          }, 0.1)`,
          borderColor: `rgba(${
            color === "#22c55e"
              ? "34, 197, 94"
              : color === "#3b82f6"
              ? "59, 130, 246"
              : "147, 51, 234"
          }, 0.3)`,
        }}
      >
        <span className={styles.checkIcon} style={{ background: color }}>
          ✓
        </span>
        <h3 style={{ color: color }}>
          {title} ({delay}초 소요)
        </h3>
      </div>
      <div className={styles.timestamp}>
        <span className={styles.timestampLabel}>서버 타임스탬프:</span>
        <span className={styles.timestampValue}>{timestamp}</span>
      </div>
    </div>
  );
}
