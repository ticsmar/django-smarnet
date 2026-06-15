"""Django session store for authentication."""

from django.contrib.sessions.backends.base import SessionBase

SESSION_ORACLE_USERNAME = "oracle_username"
SESSION_AUTHENTICATED = "authenticated"


class DjangoAuthSessionStore:
    def __init__(self, session: SessionBase) -> None:
        self._session = session

    def create_session(self, username: str) -> None:
        self._session[SESSION_ORACLE_USERNAME] = username
        self._session[SESSION_AUTHENTICATED] = True

    def clear_session(self) -> None:
        self._session.pop(SESSION_ORACLE_USERNAME, None)
        self._session.pop(SESSION_AUTHENTICATED, None)

    def get_username(self) -> str | None:
        value = self._session.get(SESSION_ORACLE_USERNAME)
        if isinstance(value, str):
            return value
        return None

    def is_authenticated(self) -> bool:
        return bool(self._session.get(SESSION_AUTHENTICATED, False))
