# -------------------------------------------------------------------
# 1. 의존성 설치 (Deps)
# -------------------------------------------------------------------
    FROM node:24-alpine AS deps
    RUN apk add --no-cache libc6-compat
    WORKDIR /app
    
    RUN corepack enable && corepack prepare pnpm@latest --activate
    
    COPY package.json pnpm-lock.yaml ./
    
    RUN pnpm install --frozen-lockfile
    
    # -------------------------------------------------------------------
    # 2. 빌드 (Builder)
    # -------------------------------------------------------------------
    FROM node:24-alpine AS builder
    WORKDIR /app
    
    RUN corepack enable && corepack prepare pnpm@latest --activate
    
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    RUN pnpm run build
    
# -------------------------------------------------------------------
# 3. 실행 (Runner)
# -------------------------------------------------------------------
    FROM node:24-alpine AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV PORT=3000
    
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    
    # [1] 먼저 Next.js 결과물을 복사합니다 (여기에 가짜 package.json이 포함됨)
    COPY --from=builder /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    # 🔥 [2] 핵심: 진짜 원본 package.json과 Lock 파일로 '덮어씌웁니다' 🔥
    # 이렇게 해야 Trivy가 "아! 이 Lock 파일이랑 package.json이랑 짝이 맞네!" 하고 읽기 시작합니다.
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
    
    USER nextjs
    
    EXPOSE 3000
    
    CMD ["node", "server.js"]