module.exports = {
  apps: [
    {
      name: 'symprio-backend',
      script: 'server.js',
      cwd: '/var/www/symprio',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '500M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
