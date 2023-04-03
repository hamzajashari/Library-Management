package com.lms.repository;

import com.lms.model.LibraryUser;
import com.lms.model.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {

    Optional<Wish> findByLibraryUser(LibraryUser libraryUser);
}
