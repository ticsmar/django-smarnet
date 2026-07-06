# ---------- Stage 1: build (baixa e extrai o Instant Client) ----------
FROM python:3.12-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/oracle && \
    wget -q https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-basiclite-linux.x64-21.13.0.0.0dbru.zip -O /tmp/instantclient.zip && \
    unzip -q /tmp/instantclient.zip -d /opt/oracle && \
    rm /tmp/instantclient.zip && \
    ln -sf /opt/oracle/instantclient_21_13/libclntsh.so.21.1 /opt/oracle/instantclient_21_13/libclntsh.so

# ---------- Stage 2: imagem final (só o necessário em runtime) ----------
FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libaio1t64 \
    && ln -s /usr/lib/x86_64-linux-gnu/libaio.so.1t64 /usr/lib/x86_64-linux-gnu/libaio.so.1 \
    && rm -rf /var/lib/apt/lists/*

# Copia apenas o Instant Client já extraído, sem wget/unzip na imagem final
COPY --from=builder /opt/oracle /opt/oracle

ENV ORACLE_HOME=/opt/oracle/instantclient_21_13
ENV LD_LIBRARY_PATH=$ORACLE_HOME:$LD_LIBRARY_PATH

WORKDIR /app/src

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app/

# Ajuste conforme seu entrypoint real (gunicorn recomendado em produção)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]