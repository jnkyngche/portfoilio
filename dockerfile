# 1. 의존성 설치 단계 (가벼운 Alpine 리눅스 사용)
FROM node:22-alpine AS base

# 2. 패키지 설치
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 패키지 파일 복사
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# 의존성 설치 (Lock 파일 종류에 따라 자동 선택)
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 3. 빌드 단계
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js 빌드
RUN npm run build

# 4. 실행 단계 (실제 서비스용 이미지)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 보안을 위해 시스템 유저 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 정적 파일 및 빌드 결과물 복사
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

# 서버 실행
CMD ["node", "server.js"]