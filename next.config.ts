/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // CloudFront 도메인 추가 (환경 변수가 있을 때만)
      ...(process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN
        ? [
            {
              protocol: "https",
              hostname: process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN,
              port: "",
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
  // ... 기타 설정
};

module.exports = nextConfig;
