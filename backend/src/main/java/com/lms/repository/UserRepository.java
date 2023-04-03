package com.lms.repository;

import java.util.List;
import java.util.Optional;

import com.lms.model.LibraryUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<LibraryUser, Long> {

	List<LibraryUser> findByEmail(String email);

	Optional<LibraryUser> findByUsername(String username);

	Optional<LibraryUser> findByUserId(String userId);

}
