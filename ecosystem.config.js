module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      instances: "max",
      exec_mode: "cluster",
      // watch: true,
      env: {
        UV_THREADPOOL_SIZE: 4,
      },
    },
  ],
};
