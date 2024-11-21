module.exports = {
  apps: [
    {
      name: "share-front",
      port: "4000",
      exec_mode: "cluster",
      instances: "max",
      script: "./.output/server/index.mjs",
    },
  ],
}
