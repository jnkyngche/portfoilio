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
