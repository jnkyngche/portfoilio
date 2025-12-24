/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";
const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || ""; // Docker build 시 주입받음

const nextConfig = {
  // 1. 프로덕션 환경이면 assetPrefix를 CDN 주소로 설정
  assetPrefix: isProd ? cdnUrl : undefined,

  // 2. next/image 사용 시 CDN 도메인 허용
  images: {
    unoptimized: true, // 비용 절감 및 단순화를 위해 최적화 끄기 (선택사항)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net", // 모든 cloudfront 도메인 허용
      },
    ],
  },

  // 3. CORS 이슈 방지
  crossOrigin: "anonymous",

  // 4. Standalone 모드 (EC2 배포용)
  output: "standalone",
};

module.exports = nextConfig;
