#!/bin/bash

# ============================================================
# Palantir Docs 部署脚本
# 用法: ./deploy.sh
# ============================================================

set -e  # 遇到错误立即退出

echo "🚀 开始部署 Palantir Docs..."

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误: 请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 步骤 1: 安装依赖
echo -e "${YELLOW}📦 步骤 1/4: 安装依赖...${NC}"
if command -v pnpm &> /dev/null; then
    pnpm install
elif command -v npm &> /dev/null; then
    npm install
else
    echo -e "${RED}❌ 错误: 未找到 pnpm 或 npm，请先安装 Node.js${NC}"
    exit 1
fi

# 步骤 2: 构建项目
echo -e "${YELLOW}🔨 步骤 2/4: 构建项目...${NC}"
if command -v pnpm &> /dev/null; then
    pnpm run build
else
    npm run build
fi

# 步骤 3: 检查 PM2
echo -e "${YELLOW}🔍 步骤 3/4: 检查 PM2...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo "安装 PM2..."
    npm install -g pm2
fi

# 步骤 4: 启动/重启服务
echo -e "${YELLOW}🚀 步骤 4/4: 启动服务...${NC}"
pm2 reload ecosystem.config.cjs --env production || pm2 start ecosystem.config.cjs --env production

echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo "📊 查看状态: pm2 status"
echo "📜 查看日志: pm2 logs palantir-docs"
echo "🌐 访问: http://localhost:3000"
