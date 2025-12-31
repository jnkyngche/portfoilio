import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  const features = [
    {
      title: "Server vs Client",
      description:
        "서버 컴포넌트와 클라이언트 컴포넌트의 API 호출 차이를 비교해보세요.",
      href: "/server-component",
      icon: "🔵",
    },
    {
      title: "Streaming SSR",
      description:
        "Next.js의 Suspense와 Streaming 기능을 시각적으로 확인해보세요.",
      href: "/streaming",
      icon: "⚡",
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Zeroth Playground</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.cardGrid}>
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className={styles.card}
            >
              <div className={styles.cardIcon}>{feature.icon}</div>
              <h2 className={styles.cardTitle}>{feature.title}</h2>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.cardLink}>테스트하기 →</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
