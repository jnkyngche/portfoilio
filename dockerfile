# -------------------------------------------------------------------
# 1. 의존성 설치 (Deps)
# -------------------------------------------------------------------
    FROM node:24-alpine AS deps
    RUN apk add --no-cache libc6-compat
    WORKDIR /app
    COPY package.json package-lock.json ./
    RUN npm ci
    
    # -------------------------------------------------------------------
    # 2. 빌드 (Builder)
    # -------------------------------------------------------------------
    FROM node:24-alpine AS builder
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    # [삭제됨] CDN URL 주입 코드 제거. 순수하게 빌드만 함.
    RUN npm run build
    
    # -------------------------------------------------------------------
    # 3. 실행 (Runner)
    # -------------------------------------------------------------------
    FROM node:24-alpine AS runner
    WORKDIR /app
    
    ENV NODE_ENV production
    ENV PORT 3000
    
    # 보안용 유저 생성
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs
    
    # 파일 복사
    COPY --from=builder /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    USER nextjs
    
    EXPOSE 3000
    
    CMD ["node", "server.js"]