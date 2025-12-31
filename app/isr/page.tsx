import styles from "./isr.module.css";
import RefreshButton from "./components/RefreshButton";

// ISR 설정: 10초마다 페이지 재생성
// Route Segment Config - 파일 최상위에서 export해야 함
export const revalidate: number = 10;

export default function ISRPage() {
  const serverTime = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>ISR Test (10초 캐싱)</h1>
        </header>

        <main className={styles.main}>
          <div className={styles.card}>
            <div className={styles.timeLabel}>서버 렌더링 시간</div>
            <div className={styles.timeDisplay}>{serverTime}</div>
            <div className={styles.description}>
              <p>
                새로고침을 해보세요. 10초가 지나기 전까지는 위 시간이 변하지
                않습니다.
              </p>
              <p>
                ISR (Incremental Static Regeneration)은 설정한 시간(10초)마다
                페이지를 백그라운드에서 재생성합니다.
              </p>
            </div>
            <RefreshButton />
          </div>
        </main>
      </div>
    </div>
  );
}
