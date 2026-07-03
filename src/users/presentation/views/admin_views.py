"""Admin API views."""

from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from shared.presentation.auth.django_user_resolver import (
    resolve_django_user_from_request,
)
from shared.presentation.auth.permissions import IsAccessAdmin, IsOracleAuthenticated
from users.application.dtos.admin_user_input_dto import (
    CreateUserAdminInputDTO,
    ListUsersInputDTO,
    ResetUserPasswordInputDTO,
    SetUserGroupsInputDTO,
    UpdateUserInputDTO,
)
from users.presentation.dependencies import (
    build_create_user_admin_use_case,
    build_get_user_use_case,
    build_list_groups_use_case,
    build_list_users_use_case,
    build_reset_user_password_use_case,
    build_set_user_groups_use_case,
    build_update_user_use_case,
)
from users.presentation.serializers.admin_serializers import (
    AdminGroupSerializer,
    AdminUserSerializer,
    CreateAdminUserRequestSerializer,
    PaginatedUsersSerializer,
    ResetPasswordResponseSerializer,
    SetUserGroupsRequestSerializer,
    SetUserPasswordRequestSerializer,
    UpdateAdminUserRequestSerializer,
    serialize_admin_user,
    serialize_groups,
    serialize_paginated_users,
)


class AdminUserListCreateView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        parameters=[
            {
                "name": "search",
                "in": "query",
                "required": False,
                "schema": {"type": "string"},
            },
            {
                "name": "page",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 1},
            },
            {
                "name": "page_size",
                "in": "query",
                "required": False,
                "schema": {"type": "integer", "default": 20},
            },
        ],
        responses={200: PaginatedUsersSerializer},
    )
    def get(self, request: Request) -> Response:
        search = request.query_params.get("search", "")
        page = int(request.query_params.get("page", "1"))
        page_size = int(request.query_params.get("page_size", "20"))
        result = build_list_users_use_case().execute(
            ListUsersInputDTO(search=search, page=page, page_size=page_size)
        )
        return Response(serialize_paginated_users(result))

    @extend_schema(
        request=CreateAdminUserRequestSerializer,
        responses={
            201: AdminUserSerializer,
            400: OpenApiResponse(description="Invalid request."),
            409: OpenApiResponse(description="User already exists."),
        },
    )
    def post(self, request: Request) -> Response:
        serializer = CreateAdminUserRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        result = build_create_user_admin_use_case().execute(
            CreateUserAdminInputDTO(
                username=validated["username"],
                password=validated["password"],
                groups=validated.get("groups", []),
                email=validated.get("email", ""),
                require_password_change=validated.get("require_password_change", True),
            )
        )
        return Response(serialize_admin_user(result), status=status.HTTP_201_CREATED)


class AdminUserDetailView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminUserSerializer, 404: OpenApiResponse()})
    def get(self, request: Request, pk: int) -> Response:
        result = build_get_user_use_case().execute(pk)
        return Response(serialize_admin_user(result))

    @extend_schema(
        request=UpdateAdminUserRequestSerializer,
        responses={200: AdminUserSerializer, 404: OpenApiResponse()},
    )
    def patch(self, request: Request, pk: int) -> Response:
        serializer = UpdateAdminUserRequestSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        actor = resolve_django_user_from_request(request)
        is_superuser = validated.get("is_superuser")
        if is_superuser is not None and (actor is None or not actor.is_superuser):
            is_superuser = None
        result = build_update_user_use_case().execute(
            UpdateUserInputDTO(
                user_id=pk,
                email=validated.get("email"),
                first_name=validated.get("first_name"),
                last_name=validated.get("last_name"),
                is_active=validated.get("is_active"),
                is_superuser=is_superuser,
            )
        )
        return Response(serialize_admin_user(result))


class AdminUserSetPasswordView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=SetUserPasswordRequestSerializer,
        responses={
            200: ResetPasswordResponseSerializer,
            404: OpenApiResponse(description="User not found."),
        },
    )
    def post(self, request: Request, pk: int) -> Response:
        serializer = SetUserPasswordRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data.get("password") or None
        if password == "":
            password = None
        result = build_reset_user_password_use_case().execute(
            ResetUserPasswordInputDTO(user_id=pk, password=password)
        )
        return Response(
            {"temporary_password": result.temporary_password},
            status=status.HTTP_200_OK,
        )


class AdminUserGroupsView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(
        request=SetUserGroupsRequestSerializer,
        responses={200: AdminUserSerializer},
    )
    def put(self, request: Request, pk: int) -> Response:
        serializer = SetUserGroupsRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        result = build_set_user_groups_use_case().execute(
            SetUserGroupsInputDTO(
                user_id=pk,
                groups=serializer.validated_data["groups"],
            )
        )
        return Response(serialize_admin_user(result))


class AdminGroupListView(APIView):
    permission_classes = [IsOracleAuthenticated, IsAccessAdmin]

    @extend_schema(responses={200: AdminGroupSerializer(many=True)})
    def get(self, request: Request) -> Response:
        groups = build_list_groups_use_case().execute()
        return Response(serialize_groups(groups))
