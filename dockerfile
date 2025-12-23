# -------------------------------------------------------------------
# 1. 의존성 설치 단계 (Deps)
# -------------------------------------------------------------------
# 최신 Active LTS인 Node.js v24 (Alpine Linux) 사용
FROM node:24-alpine AS deps

# Alpine 리눅스에서 Next.js의 이미지 최적화 등을 위해 필수
RUN apk add --no-cache libc6-compat

WORKDIR /app

# 패키지 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm ci

# -------------------------------------------------------------------
# 2. 빌드 단계 (Builder)
# -------------------------------------------------------------------
FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 빌드 (Standalone 모드)
RUN npm run build

# -------------------------------------------------------------------
# 3. 실행 단계 (Runner)
# -------------------------------------------------------------------
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# 보안을 위해 시스템 그룹/유저 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 정적 파일 복사
COPY --from=builder /app/public ./public

# Standalone 빌드 결과물 복사 및 권한 부여
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# non-root 사용자 전환
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]