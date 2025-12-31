import { Suspense } from "react";
import styles from "./streaming.module.css";
import SlowDataComponent from "./components/SlowDataComponent";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ApiDataComponent from "./components/ApiDataComponent";

export default function StreamingPage() {
  const components = [
    {
      id: 1,
      delay: 2,
      title: "빠른 데이터 로드 완료",
      color: "#22c55e",
      description: "2초 지연 - 가장 빠른 컴포넌트",
    },
    {
      id: 2,
      delay: 3,
      title: "데이터 로드 완료",
      color: "#3b82f6",
      description: "3초 지연 - 중간 속도 컴포넌트",
    },
    {
      id: 3,
      delay: 5,
      title: "느린 데이터 로드 완료",
      color: "#9333ea",
      description: "5초 지연 - 가장 느린 컴포넌트",
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Streaming SSR 테스트</h1>
          <div className={styles.description}>
            <p>
              Next.js의 <strong>Suspense</strong>와{" "}
              <strong>Streaming SSR</strong> 기능을 테스트하는 페이지입니다.
            </p>
            <p>
              아래 컴포넌트들은 각각 다른 지연 시간을 가지며, 로딩 중에는
              스켈레톤 UI가 표시됩니다. 페이지를 새로고침하면 각 컴포넌트가
              독립적으로 스트리밍되는 것을 확인할 수 있습니다.
            </p>
          </div>
        </header>

        <section className={styles.infoBox}>
          <h2 className={styles.infoTitle}>What is Streaming SSR?</h2>
          <div className={styles.infoContent}>
            <p>
              기존 <strong>SSR</strong>은 모든 데이터가 준비될 때까지 브라우저가
              HTML을 받지 못해 <strong>&quot;흰 화면(Blank Screen)&quot;</strong>을
              오래 보게 됩니다.
            </p>
            <p>
              <strong>Streaming SSR</strong>은 HTML을 작은 청크(Chunk)로 나누어
              전송합니다. 덕분에 사용자는 느린 데이터가 로딩되는 동안에도 페이지의
              기본 레이아웃을 즉시 볼 수 있습니다.
            </p>
            <div className={styles.benefitsList}>
              <h3 className={styles.benefitsTitle}>핵심 이점</h3>
              <ul>
                <li>
                  <strong>TTFB (Time To First Byte) 단축:</strong> 서버가 요청을
                  받자마자 응답을 시작함.
                </li>
                <li>
                  <strong>FCP (First Contentful Paint) 개선:</strong> 사용자가
                  콘텐츠를 더 빨리 봄.
                </li>
              </ul>
            </div>
            <div className={styles.metricsSection}>
              <h3 className={styles.metricsTitle}>Key Metrics (성능 지표)</h3>
              <ul className={styles.metricsList}>
                <li>
                  <strong className={styles.metricTerm}>TTFB (Time To First Byte):</strong>{" "}
                  서버로부터 첫 번째 응답을 받는 시간. Streaming 사용 시 획기적으로 단축됨.
                </li>
                <li>
                  <strong className={styles.metricTerm}>FCP (First Contentful Paint):</strong>{" "}
                  사용자가 화면에서 첫 콘텐츠를 보는 시점. Streaming 덕분에 흰 화면 없이 즉시 로딩 상태를 볼 수 있음.
                </li>
                <li>
                  <strong className={styles.metricTerm}>TTI (Time To Interactive):</strong>{" "}
                  사용자가 실제로 클릭 가능한 시점. 하이드레이션(Hydration)이 완료되어야 함.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <main className={styles.main}>
          <div className={styles.componentsGrid}>
            {components.map((component) => (
              <div key={component.id} className={styles.section}>
                <h2 className={styles.sectionTitle}>{component.description}</h2>
                <Suspense fallback={<LoadingSkeleton />}>
                  <SlowDataComponent
                    delay={component.delay}
                    title={component.title}
                    color={component.color}
                  />
                </Suspense>
              </div>
            ))}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                외부 API 호출 - quotable.io
              </h2>
              <Suspense fallback={<LoadingSkeleton />}>
                <ApiDataComponent />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
