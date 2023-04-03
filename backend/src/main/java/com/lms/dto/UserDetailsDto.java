package com.lms.dto;

import com.lms.model.LibraryUser;
import com.lms.model.enumerations.Role;
import lombok.Data;

@Data
public class UserDetailsDto {
    private String username;
    private String userId;
    private Role role;

    public static UserDetailsDto of(LibraryUser user) {
        UserDetailsDto details = new UserDetailsDto();
        details.username = user.getUsername();
        details.role = user.getRole();
        details.userId = user.getUserId();
        return details;
    }
}
