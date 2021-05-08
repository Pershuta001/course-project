package com.example.project.enums;

public enum Permissions {

    CREATE_PROFILE("profile:read"),
    UPDATE_PROFILE("profile:update"),
    DELETE_PROFILE("profile:delete"),

    READ_MARKER("marker:read"),
    CREATE_MARKER("marker:create"),
    REPLY_FOR_MARKER("marker:reply"),
    DELETE_MARKER("marker:delete"),

    CREATE_TAG("tag:create"),
    READ_TAG("tag:read"),
    DELETE_TAG("tag:delete"),

    USER_READ("user:read"),
    USER_BLOCK("user:block"),
    USER_UNBLOCK("user:unblock"),
    USER_DELETE("user:delete"),

    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete")
    ;
    private final String permission;

    Permissions(String permission) {
        this.permission = permission;
    }

    public String getPermission(){
        return permission;
    }
}
