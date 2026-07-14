"""Root pytest configuration."""

import os

os.environ.setdefault("ORACLE_CLIENT_PATH", "")
os.environ.setdefault("SECRET_KEY", "test-secret-key")
