"use client";

import { useState, useEffect } from "react";

interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// 클라이언트 컴포넌트 - 브라우저에서 외부 API 호출
export default function ClientApiCall() {
  const [data, setData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 자동으로 데이터 가져오기
    const fetchData = async () => {
      setLoading(true);
      // 브라우저에서 실행되므로 네트워크 탭에 보임
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/2"
      );
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRefetch = async () => {
    setLoading(true);
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/2"
    );
    const result = await response.json();
    setData(result);
    setLoading(false);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!data) {
    return <div>데이터 없음</div>;
  }

  return (
    <div>
      <p>
        <strong>제목:</strong> {data.title}
      </p>
      <p>
        <strong>작성자 ID:</strong> {data.userId}
      </p>
      <p>
        <strong>게시글 ID:</strong> {data.id}
      </p>
      <p style={{ fontSize: "0.875rem", color: "#8b949e", marginTop: "8px" }}>
        {data.body.substring(0, 100)}...
      </p>
      <button
        onClick={handleRefetch}
        disabled={loading}
        style={{
          marginTop: "12px",
          padding: "8px 16px",
          backgroundColor: loading ? "#666" : "#58a6ff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "로딩 중..." : "다시 가져오기"}
      </button>
      <p style={{ fontSize: "0.875rem", color: "#58a6ff", marginTop: "12px" }}>
        🟢 클라이언트에서 외부 API 호출 → 네트워크 탭에 <strong>보임</strong>
      </p>
    </div>
  );
}
