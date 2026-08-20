"""Admin API URL configuration."""

from django.urls import path

from apps.users.presentation.views.admin_views import (
    AdminChapaLookupListView,
    AdminCompanyListView,
    AdminCountryListView,
    AdminGroupListView,
    AdminLanguageListView,
    AdminLoginCheckView,
    AdminOracleUserImportListView,
    AdminOracleUserImportView,
    AdminPartnerLookupListView,
    AdminPendingRequestApproveView,
    AdminPendingRequestCreateEmpresaView,
    AdminPendingRequestDiscardView,
    AdminPendingRequestListView,
    AdminPendingRequestLoginOptionsView,
    AdminPendingRequestRegisterFieldsView,
    AdminPersonContactTypeListView,
    AdminPersonListView,
    AdminPriceListCatalogView,
    AdminProductPermissionListView,
    AdminStateCatalogListView,
    AdminStateListView,
    AdminUserDetailView,
    AdminUserGroupsView,
    AdminUserListCreateView,
    AdminUserProductPermissionsView,
    AdminUserSetPasswordView,
)

urlpatterns = [
    path("chapas/", AdminChapaLookupListView.as_view(), name="admin-chapas"),
    path(
        "oracle-users/",
        AdminOracleUserImportListView.as_view(),
        name="admin-oracle-users",
    ),
    path(
        "oracle-users/<int:usu_chapa>/import/",
        AdminOracleUserImportView.as_view(),
        name="admin-oracle-user-import",
    ),
    path("companies/", AdminCompanyListView.as_view(), name="admin-companies"),
    path("partners/", AdminPartnerLookupListView.as_view(), name="admin-partners"),
    path("requests/", AdminPendingRequestListView.as_view(), name="admin-requests"),
    path(
        "requests/<int:ppe_codigo>/approve/",
        AdminPendingRequestApproveView.as_view(),
        name="admin-request-approve",
    ),
    path(
        "requests/<int:ppe_codigo>/discard/",
        AdminPendingRequestDiscardView.as_view(),
        name="admin-request-discard",
    ),
    path(
        "requests/<int:ppe_codigo>/register-fields/",
        AdminPendingRequestRegisterFieldsView.as_view(),
        name="admin-request-register-fields",
    ),
    path(
        "requests/<int:ppe_codigo>/create-empresa/",
        AdminPendingRequestCreateEmpresaView.as_view(),
        name="admin-request-create-empresa",
    ),
    path(
        "requests/<int:ppe_codigo>/login-options/",
        AdminPendingRequestLoginOptionsView.as_view(),
        name="admin-request-login-options",
    ),
    path("logins/check/", AdminLoginCheckView.as_view(), name="admin-logins-check"),
    path(
        "catalog/languages/",
        AdminLanguageListView.as_view(),
        name="admin-catalog-languages",
    ),
    path(
        "catalog/price-lists/",
        AdminPriceListCatalogView.as_view(),
        name="admin-catalog-price-lists",
    ),
    path("people/", AdminPersonListView.as_view(), name="admin-people"),
    path(
        "person-contact-types/",
        AdminPersonContactTypeListView.as_view(),
        name="admin-person-contact-types",
    ),
    path("countries/", AdminCountryListView.as_view(), name="admin-countries"),
    path("states/", AdminStateListView.as_view(), name="admin-states"),
    path(
        "states-catalog/",
        AdminStateCatalogListView.as_view(),
        name="admin-states-catalog",
    ),
    path("groups/", AdminGroupListView.as_view(), name="admin-groups"),
    path(
        "product-permissions/",
        AdminProductPermissionListView.as_view(),
        name="admin-product-permissions",
    ),
    path("users/", AdminUserListCreateView.as_view(), name="admin-users"),
    path("users/<int:pk>/", AdminUserDetailView.as_view(), name="admin-user-detail"),
    path(
        "users/<int:pk>/set-password/",
        AdminUserSetPasswordView.as_view(),
        name="admin-user-set-password",
    ),
    path(
        "users/<int:pk>/groups/",
        AdminUserGroupsView.as_view(),
        name="admin-user-groups",
    ),
    path(
        "users/<int:pk>/product-permissions/",
        AdminUserProductPermissionsView.as_view(),
        name="admin-user-product-permissions",
    ),
]
