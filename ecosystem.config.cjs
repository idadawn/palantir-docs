module.exports = {
  apps: [
    {
      name: 'palantir-docs',
      script: './dist/index.js',
      instances: 1,          // 单实例，可根据服务器配置改为 'max' 使用多核
      exec_mode: 'fork',     // 或使用 'cluster' 模式
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // 日志配置
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // 自动重启配置
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      
      // 内存限制
      max_memory_restart: '500M',
      
      // 监控
      watch: false,  // 生产环境不启用文件监听
      
      // 启动配置
      kill_timeout: 5000,
      listen_timeout: 10000,
      
      // 重启策略
      restart_delay: 3000,
    }
  ]
};
