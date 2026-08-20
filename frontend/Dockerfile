# build context = repo root
#   docker build -f frontend/Dockerfile .
FROM node:20-alpine AS builder
WORKDIR /repo/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY frontend/ .
# Markdown da Documentação do Sistema (import.meta.glob em ../docs)
COPY docs/ /repo/docs/
ARG VITE_DJANGO_API_URL=http://localhost:8000/api
ARG VITE_APP_RUNTIME_ENV=production
ENV VITE_DJANGO_API_URL=$VITE_DJANGO_API_URL
ENV VITE_APP_RUNTIME_ENV=$VITE_APP_RUNTIME_ENV
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve@14
COPY --from=builder /repo/frontend/dist ./dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
