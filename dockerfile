# -------------------------------------------------------------------
# 1. 의존성 설치 (Deps)
# -------------------------------------------------------------------
    FROM node:24-alpine AS deps
    RUN apk add --no-cache libc6-compat
    WORKDIR /app
    
    # [변경] pnpm 활성화
    RUN corepack enable && corepack prepare pnpm@latest --activate
    
    # [변경] pnpm-lock.yaml 복사
    COPY package.json pnpm-lock.yaml ./
    
    # [변경] pnpm으로 의존성 설치 
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

# 보안용 유저 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]