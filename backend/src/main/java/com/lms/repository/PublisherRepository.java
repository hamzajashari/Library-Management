package com.lms.repository;

import com.lms.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PublisherRepository  extends JpaRepository<Publisher, Long> {
    Publisher findByEmail(String email);

    @Query("select a from Publisher a where a.name like %:name% or a.surname like %:surname%")
    List<Publisher> findByNameOrSurname(String name, String surname);
}
