import Image from "next/image";
import styles from "./image.module.css";

export default function ImageOptimizationPage() {
  const imageUrl =
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Image Optimization: CLS & Format Test</h1>
        <p className={styles.subtitle}>
          개발자 도구의 Network 탭을 열어 이미지 로딩과 포맷 변환을 확인해보세요
        </p>
      </header>

      {/* 테스트 가이드 섹션 */}
      <div className={styles.testGuide}>
        <div className={styles.testGuideContent}>
          <h2 className={styles.testGuideTitle}>🧪 테스트하는 법</h2>
          <p className={styles.testGuideIntro}>
            이 페이지의 최적화 효과를 체감하려면 브라우저의{" "}
            <strong>Network Throttling</strong> 기능을 사용해보세요.
          </p>
          <div className={styles.testGuideSteps}>
            <h3 className={styles.testGuideStepsTitle}>실행 단계:</h3>
            <ol className={styles.stepsList}>
              <li>
                <kbd>F12</kbd>를 눌러 개발자 도구를 엽니다.
              </li>
              <li>
                <strong>Network</strong> 탭으로 이동합니다.
              </li>
              <li>
                &apos;No throttling&apos;을 <strong>&apos;Slow 3G&apos;</strong>{" "}
                또는 <strong>&apos;Fast 3G&apos;</strong>로 변경합니다.
              </li>
              <li>
                페이지를 <strong>새로고침(Cmd/Ctrl + R)</strong> 하세요.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        {/* 섹션 1: The Bad (Standard <img>) */}
        <section className={`${styles.section} ${styles.sectionBad}`}>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleBad}`}>
            ❌ The Bad (Standard &lt;img&gt;)
          </h2>
          <p className={styles.description}>
            표준 img 태그: 이미지가 로드되면서 레이아웃이 덜컥거릴 수 있음(CLS).
            원본 포맷(JPG/PNG) 그대로 전송됨.
          </p>
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt="Standard img tag - High resolution landscape"
              className={styles.standardImg}
            />
          </div>
          <div className={styles.caption}>
            Network 탭에서 확인: 원본 JPG/PNG 포맷, 큰 파일 크기, 레이아웃
            시프트 발생 가능
          </div>
        </section>

        {/* 섹션 2: The Good (next/image) */}
        <section className={`${styles.section} ${styles.sectionGood}`}>
          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleGood}`}>
            ✅ The Good (next/image)
          </h2>
          <p className={styles.description}>
            Next Image: 영역이 미리 잡혀있어 밀림 현상 없음. 자동으로
            WebP/AVIF로 변환되어 전송됨. Lazy Loading 적용.
          </p>
          <div className={styles.imageContainer}>
            <div className={styles.nextImageWrapper}>
              <Image
                src={imageUrl}
                alt="Next.js Image component - Optimized landscape"
                width={2070}
                height={1380}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                style={{
                  width: "100%",
                  height: "auto",
                }}
                sizes="(max-width: 768px) 100vw, 85vw"
                quality={90}
              />
            </div>
          </div>
          <div className={styles.caption}>
            Network 탭에서 확인: WebP/AVIF 포맷으로 자동 변환, 작은 파일 크기,
            레이아웃 시프트 없음, Lazy Loading 적용
          </div>
        </section>

        {/* 섹션 3: Unknown Dimensions (using fill) */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            📐 Unknown Dimensions (using `fill`)
          </h2>
          <p className={styles.description}>
            Fill Prop: 원본 크기를 몰라도 부모 컨테이너(relative)에 맞춰
            반응형으로 렌더링됨. `object-fit: cover`와 함께 자주 사용.
          </p>
          <div className={styles.imageContainer}>
            <div className={styles.fillContainer}>
              <Image
                src={imageUrl}
                alt="Next.js Image with fill prop - Responsive container"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
              />
            </div>
          </div>
          <div className={styles.caption}>
            부모 컨테이너에 맞춰 자동으로 크기 조정. 원본 이미지 크기를 알 필요
            없음. object-fit: cover로 비율 유지하며 컨테이너 채움.
          </div>
        </section>
      </main>
    </div>
  );
}
