# 🚀 服务器部署指南

## 环境要求

- Node.js 20+
- pnpm 或 npm
- PM2（推荐，用于进程管理）
- Nginx（可选，用于反向代理和 HTTPS）

---

## 方法一：PM2 部署（推荐）

### 1. 克隆代码到服务器

```bash
cd /opt
git clone https://github.com/idadawn/palantir-docs.git
cd palantir-docs
```

### 2. 运行部署脚本

```bash
chmod +x deploy.sh
./deploy.sh
```

### 3. PM2 常用命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs palantir-docs

# 重启
pm2 reload palantir-docs

# 停止
pm2 stop palantir-docs

# 开机自启
pm2 startup
pm2 save
```

---

## 方法二：Docker 部署

### 1. 使用 Docker Compose

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down

# 重建（更新代码后）
docker-compose up -d --build
```

### 2. 直接使用 Docker

```bash
# 构建镜像
docker build -t palantir-docs .

# 运行容器
docker run -d \
  --name palantir-docs \
  -p 3000:3000 \
  --restart unless-stopped \
  palantir-docs
```

---

## 方法三：手动部署

```bash
# 1. 安装依赖
pnpm install

# 2. 构建
pnpm run build

# 3. 启动
NODE_ENV=production PORT=3000 node dist/index.js
```

---

## 配置 Nginx（可选但推荐）

### 1. 复制配置文件

```bash
sudo cp nginx.conf /etc/nginx/sites-available/palantir-docs
sudo ln -s /etc/nginx/sites-available/palantir-docs /etc/nginx/sites-enabled/
```

### 2. 修改域名

```bash
sudo nano /etc/nginx/sites-available/palantir-docs
# 修改 server_name your-domain.com;
```

### 3. 测试并重载

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 配置 HTTPS（Let's Encrypt）

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 申请证书
sudo certbot --nginx -d your-domain.com

# 自动续期测试
sudo certbot renew --dry-run
```

---

## 目录结构（部署后）

```
/opt/palantir-docs/
├── dist/              # 构建产物
│   ├── index.js       # 后端入口
│   └── public/        # 前端静态文件
├── logs/              # 日志目录
│   ├── combined.log
│   ├── out.log
│   └── error.log
├── node_modules/      # 依赖
├── deploy.sh          # 部署脚本
├── ecosystem.config.cjs  # PM2 配置
├── docker-compose.yml    # Docker 配置
└── ...
```

---

## 防火墙配置

```bash
# 开放 80 端口（HTTP）
sudo ufw allow 80/tcp

# 开放 443 端口（HTTPS）
sudo ufw allow 443/tcp

# 如果不用 Nginx，直接暴露 3000 端口
sudo ufw allow 3000/tcp
```

---

## 故障排查

### 端口被占用

```bash
# 查看 3000 端口占用
sudo lsof -i :3000

# 结束进程
sudo kill -9 <PID>
```

### 权限问题

```bash
# 确保有执行权限
chmod +x deploy.sh

# 确保日志目录存在
mkdir -p logs
```

### 内存不足

编辑 `ecosystem.config.cjs`，调整 `max_memory_restart` 值。

---

## 自动部署（GitHub Actions）

可以在 `.github/workflows/deploy.yml` 添加自动部署（需要配置 SSH 密钥）。

需要我帮你配置吗？
