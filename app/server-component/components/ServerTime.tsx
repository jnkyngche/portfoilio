// 서버 컴포넌트 - "use client"가 없음
export default function ServerTime() {
  const time = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div>
      <p>
        <strong>현재 시간:</strong> {time}
      </p>
      <p style={{ fontSize: "0.875rem", color: "#666", marginTop: "8px" }}>
        이 시간은 서버에서 렌더링되었습니다. 새로고침하면 업데이트됩니다.
      </p>
    </div>
  );
}
