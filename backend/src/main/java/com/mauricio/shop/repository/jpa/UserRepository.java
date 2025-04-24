package com.mauricio.shop.repository.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mauricio.shop.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findByUsername(String username);

    public boolean existsByUsername(String username);

    public boolean existsByEmail(String email);

}
