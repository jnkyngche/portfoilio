## 🏗️ Architecture & Deployment

### 1. Service Architecture (User Request Flow)

사용자의 요청을 효율적으로 처리하기 위해 **CloudFront**를 앞단에 배치하고, 정적 리소스와 동적 요청을 분리하여 처리합니다.

![Service Architecture](/public/flow.png)

- **Entry Point:** Route 53 DNS를 통해 **CloudFront(HTTPS)**로 진입합니다.
- **Static Assets:** 이미지, CSS, JS 등 정적 파일은 **AWS S3**에서 캐싱되어 빠르게 제공됩니다.
- **Dynamic Content:** 동적 요청은 **EC2** 내부의 **Nginx**를 거쳐 **Next.js Docker Container**가 처리합니다.

### 2. CI/CD Pipeline (Deployment Flow)

**GitHub Actions**를 통해 빌드부터 배포까지 전 과정을 자동화했으며, **AWS SSM**을 도입하여 보안을 강화했습니다.

![CI/CD Pipeline](/public/ci.png)

- **Build & Push:** 코드가 main 브랜치에 푸시되면 Docker 이미지를 빌드하여 **AWS ECR**에 업로드합니다.
- **Asset Optimization:** 정적 파일(Assets)을 추출하여 **AWS S3**로 별도 업로드(Sync)합니다.
- **Secure Deployment:** SSH 키 없이 **AWS SSM(Systems Manager)**을 통해 EC2에 배포 명령을 안전하게 전달합니다.
- **Notification:** 배포 시작 및 결과는 **Slack**으로 실시간 알림을 받습니다.
