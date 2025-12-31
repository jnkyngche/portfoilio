import styles from "../streaming.module.css";

interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function fetchPost(): Promise<PostData> {
  // 외부 API 호출 - JSONPlaceholder의 랜덤 포스트 API (더 안정적)
  // 1부터 100 사이의 랜덤 ID 사용
  const randomId = Math.floor(Math.random() * 100) + 1;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${randomId}`,
    {
      cache: "no-store", // 캐시 비활성화로 매번 새로운 데이터
      next: { revalidate: 0 }, // Next.js 캐시 비활성화
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  return response.json();
}

export default async function ApiDataComponent() {
  let post: PostData;
  let error: string | null = null;

  try {
    post = await fetchPost();
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error";
    // 에러 발생 시 기본 데이터 사용
    post = {
      id: 0,
      title: "API 호출 실패",
      body: "외부 API를 불러오는 중 오류가 발생했습니다.",
      userId: 0,
    };
  }

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
          background: error
            ? "rgba(239, 68, 68, 0.1)"
            : "rgba(251, 191, 36, 0.1)",
          borderColor: error
            ? "rgba(239, 68, 68, 0.3)"
            : "rgba(251, 191, 36, 0.3)",
        }}
      >
        <span
          className={styles.checkIcon}
          style={{ background: error ? "#ef4444" : "#fbbf24" }}
        >
          {error ? "✗" : "✓"}
        </span>
        <h3 style={{ color: error ? "#ef4444" : "#fbbf24" }}>
          {error ? "외부 API 호출 실패" : "외부 API 호출 완료!"}
        </h3>
      </div>
      {error && (
        <div className={styles.errorMessage}>
          <p>오류: {error}</p>
        </div>
      )}
      <div className={styles.apiContent}>
        <div className={styles.quoteContainer}>
          <p className={styles.quoteText}>&quot;{post.title}&quot;</p>
          <p className={styles.postBody}>{post.body}</p>
          <p className={styles.quoteAuthor}>
            Post ID: {post.id} | User ID: {post.userId}
          </p>
        </div>
        <div className={styles.apiInfo}>
          <span className={styles.apiLabel}>API:</span>
          <span className={styles.apiValue}>
            jsonplaceholder.typicode.com/posts
          </span>
        </div>
      </div>
      <div className={styles.timestamp}>
        <span className={styles.timestampLabel}>서버 타임스탬프:</span>
        <span className={styles.timestampValue}>{timestamp}</span>
      </div>
    </div>
  );
}
