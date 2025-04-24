package com.mauricio.shop.validator;

import java.util.Arrays;

import com.mauricio.shop.enums.Role;

public class ValidatorUtils {

    private ValidatorUtils() {
        // Prevent instantiation
    }

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static boolean isValidEmail(String email) {
        return email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }

    public static boolean isValidRole(Role role) {
        return role != null && Arrays.asList(Role.values()).contains(role);
    }
}
