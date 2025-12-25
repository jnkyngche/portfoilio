// 서버 컴포넌트 - 서버에서 외부 API 호출
async function fetchServerData() {
  // 서버에서 실행되므로 네트워크 탭에 보이지 않음
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store", // 캐시 비활성화
  });
  return response.json();
}

export default async function ServerApiCall() {
  const data = await fetchServerData();

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
      <p style={{ fontSize: "0.875rem", color: "#58a6ff", marginTop: "12px" }}>
        ⚡ 서버에서 외부 API 호출 → 네트워크 탭에 <strong>보이지 않음</strong>
      </p>
    </div>
  );
}
