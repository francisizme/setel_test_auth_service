module.exports = {
  apps: [
    {
      name: 'auth_endpoint',
      script: './dist/src/main.js',
      instances: 1,
      exec_mode: 'cluster',
      max_memory_restart: '400M',
    },
    {
      name: 'auth_service',
      script: './dist/src/listener.js',
      instances: 1,
      exec_mode: 'cluster',
      max_memory_restart: '400M',
    },
  ],
};
