import { Suspense } from "react";
import ServerApiCall from "./components/ServerApiCall";
import ClientApiCall from "./components/ClientApiCall";
import styles from "./page.module.css";
import ServerTime from "./components/ServerTime";

export default async function ServerComponentPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>서버 vs 클라이언트 API 호출 비교</h1>
        <p className={styles.subtitle}>
          네트워크 탭(F12)을 열고 두 컴포넌트의 차이를 확인하세요
        </p>
      </div>

      <div className={styles.grid}>
        {/* 서버 컴포넌트: API 호출 */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>🔵 서버 컴포넌트 (API 호출)</h2>
          <Suspense fallback={<div className={styles.loading}>로딩 중...</div>}>
            <ServerApiCall />
          </Suspense>
        </div>

        {/* 클라이언트 컴포넌트: API 호출 */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            🟢 클라이언트 컴포넌트 (API 호출)
          </h2>
          <ClientApiCall />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <ServerTime />
        </div>
      </div>

      <div className={styles.info}>
        <h3>네트워크 탭에서 확인할 수 있는 차이</h3>
        <div className={styles.comparison}>
          <div className={styles.comparisonItem}>
            <h4 style={{ color: "#58a6ff", marginBottom: "12px" }}>
              🔵 서버 컴포넌트
            </h4>
            <ul>
              <li>서버에서 API 호출 실행</li>
              <li>
                <strong>네트워크 탭에 요청이 보이지 않음</strong>
              </li>
              <li>서버-서버 통신 (빠름)</li>
              <li>초기 HTML에 데이터 포함</li>
              <li>클라이언트 번들 크기 감소</li>
            </ul>
          </div>
          <div className={styles.comparisonItem}>
            <h4 style={{ color: "#58a6ff", marginBottom: "12px" }}>
              🟢 클라이언트 컴포넌트
            </h4>
            <ul>
              <li>브라우저에서 API 호출 실행</li>
              <li>
                <strong>네트워크 탭에 요청이 보임</strong>
              </li>
              <li>브라우저-서버 통신 (상대적으로 느림)</li>
              <li>로딩 상태 필요</li>
              <li>클라이언트 번들 크기 증가</li>
            </ul>
          </div>
        </div>
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "rgba(88, 166, 255, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(88, 166, 255, 0.2)",
          }}
        >
          <h4 style={{ marginBottom: "12px", color: "#58a6ff" }}>
            테스트 방법
          </h4>
          <ol style={{ margin: 0, paddingLeft: "20px" }}>
            <li>브라우저 개발자 도구 열기 (F12)</li>
            <li>네트워크 탭 선택</li>
            <li>페이지 새로고침</li>
            <li>
              <strong>서버 컴포넌트</strong>: jsonplaceholder.typicode.com
              요청이 보이지 않음
            </li>
            <li>
              <strong>클라이언트 컴포넌트</strong>: jsonplaceholder.typicode.com
              요청이 보임
            </li>
            <li>&quot;다시 가져오기&quot; 버튼 클릭 시 추가 요청 확인</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
