# ============================================================
# Palantir Docs Docker 构建文件
# ============================================================

# 阶段 1: 构建
FROM node:20-alpine AS builder

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm run build

# 阶段 2: 生产环境
FROM node:20-alpine AS production

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 仅复制生产依赖
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile --prod

# 复制构建产物
COPY --from=builder /app/dist ./dist

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 启动命令
CMD ["node", "dist/index.js"]
