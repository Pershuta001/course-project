package com.example.project.enums;

import com.google.common.collect.Sets;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.example.project.enums.Permissions.*;

@Getter
public enum Roles {

    GUEST(Sets.newHashSet(CREATE_PROFILE)),
    USER(Sets.newHashSet(
            UPDATE_PROFILE, DELETE_PROFILE, DELETE_PROFILE,READ_TAG,
            CREATE_MARKER, READ_MARKER, DELETE_MARKER, REPLY_FOR_MARKER)),
    ADMIN(Sets.newHashSet(
            UPDATE_PROFILE, DELETE_PROFILE, DELETE_PROFILE,
            CREATE_MARKER, READ_MARKER, DELETE_MARKER, REPLY_FOR_MARKER,
            CREATE_TAG, READ_TAG, DELETE_TAG,
            USER_BLOCK, USER_READ, USER_UNBLOCK, USER_DELETE
    )),
    SUPER_ADMIN(Sets.newHashSet(
            UPDATE_PROFILE, DELETE_PROFILE, DELETE_PROFILE,
            CREATE_MARKER, READ_MARKER, DELETE_MARKER, REPLY_FOR_MARKER,
            CREATE_TAG, READ_TAG, DELETE_TAG,
            USER_BLOCK, USER_READ, USER_UNBLOCK, USER_DELETE,
            ADMIN_CREATE, ADMIN_DELETE
    ));
    private final Set<Permissions> permissions;

    Roles(Set<Permissions> permissions) {
        this.permissions = permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));

        return permissions;
    }

}
