"""Unit tests for admin login suggestion helpers."""

from django.test import SimpleTestCase

from apps.users.domain.validation.login_suggestions import (
    build_login_suggestions,
    nome_reduzido_compact,
)


class LoginSuggestionTests(SimpleTestCase):
    def test_nome_reduzido_compact(self):
        self.assertEqual(
            nome_reduzido_compact("Joao Carlos Silva Santos"), "joaocssantos"
        )

    def test_suggestions_external_company_uses_email_local(self):
        options = build_login_suggestions("Maria Souza", "maria.souza@acme.com", 99)
        self.assertIn("maria.souza", options)
        self.assertIn("msouza", options)

    def test_suggestions_smar_company_uses_first_name(self):
        options = build_login_suggestions("Maria Souza", "maria@smar.com.br", 1)
        self.assertIn("maria", options)

    def test_junior_suffix_ignored_for_last(self):
        options = build_login_suggestions("Pedro Alves Junior", "pedro@acme.com", 2)
        self.assertIn("pedro.alves", options)
