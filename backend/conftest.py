"""Root pytest configuration."""

import os

os.environ.setdefault("ORACLE_CLIENT_PATH", "")
os.environ.setdefault("SECRET_KEY", "test-secret-key")
os.environ.setdefault("ORACLE_HOST", "localhost")
os.environ.setdefault("ORACLE_PORT", "1521")
os.environ.setdefault("ORACLE_SERVICE_NAME", "ORCL")
os.environ.setdefault("ORACLE_USER", "test_user")
os.environ.setdefault("ORACLE_PASSWORD", "test_pass")
os.environ.setdefault("ORACLE_SMAR_USER", "smar_user")
os.environ.setdefault("ORACLE_SMAR_PASSWORD", "smar_pass")
