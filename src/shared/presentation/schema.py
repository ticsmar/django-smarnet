"""OpenAPI extensions for shared presentation layer."""

from drf_spectacular.extensions import OpenApiAuthenticationExtension


class OracleSessionAuthenticationScheme(OpenApiAuthenticationExtension):  # type: ignore[no-untyped-call]
    target_class = (
        "shared.presentation.auth.session_authentication.OracleSessionAuthentication"
    )
    name = "oracleSessionAuth"

    def get_security_definition(self, auto_schema: object) -> dict[str, str]:
        return {
            "type": "apiKey",
            "in": "cookie",
            "name": "sessionid",
        }
