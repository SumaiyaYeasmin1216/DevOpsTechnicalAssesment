FROM nginx:1.31.3-alpine@sha256:2776cd5b70d8983e27e9f5c90abee3d24c690014ae8ecbb529572d954a459096

LABEL org.opencontainers.image.title="LumaStack company site" \
      org.opencontainers.image.description="Static company landing page for the DevOps technical assessment" \
      org.opencontainers.image.source="https://github.com/SumaiyaYeasmin1216/DevOpsTechnicalAssesment"

COPY nginx.conf /etc/nginx/nginx.conf
COPY index.html styles.css script.js favicon.svg /usr/share/nginx/html/

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1
