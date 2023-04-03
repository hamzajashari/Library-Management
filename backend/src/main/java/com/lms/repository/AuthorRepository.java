package com.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lms.model.Author;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

	Author findByEmail(String email);

	@Query("select a from Author a where a.name like %:name% or a.surname like %:surname%")
	List<Author> findByNameOrSurname(String name, String surname);

}
