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
    
    # [핵심] GitHub Actions에서 넘어온 CDN URL을 받음
    ARG NEXT_PUBLIC_CDN_URL
    ENV NEXT_PUBLIC_CDN_URL=$NEXT_PUBLIC_CDN_URL
    
    # Next.js 빌드 (이때 자바스크립트 파일 내부 경로가 CDN 주소로 바뀜)
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
    
    # [중요] Standalone 모드에 필요한 파일 복사
    # 정적 파일은 S3로 가지만, 서버 구동 안정성을 위해(404 페이지 등) 내부에도 복사해둡니다.
    COPY --from=builder /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    USER nextjs
    
    EXPOSE 3000
    
    CMD ["node", "server.js"]