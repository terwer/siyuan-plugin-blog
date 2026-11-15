# Build the standalone Node output before building this runtime image.
FROM node:24-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6
WORKDIR /app
COPY --chown=65532:65532 .output/ /app/
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4000
USER 65532:65532
EXPOSE 4000
HEALTHCHECK --interval=10s --timeout=5s --start-period=20s --retries=6 CMD ["node", "-e", "fetch('http://127.0.0.1:4000/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
ENTRYPOINT ["node", "/app/server/index.mjs"]
