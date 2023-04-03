package com.lms.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "WISH")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@NoArgsConstructor
public class Wish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private LibraryUser libraryUser;

    @ManyToMany
    @Column(name = "BOOK_LIST")
    private List<Book> bookList;

    @Column(name ="DATE_CREATED")
    private LocalDateTime dateCreated;

    public Wish(LibraryUser libraryUser) {
        this.dateCreated = LocalDateTime.now();
        this.libraryUser = libraryUser;
        this.bookList = new ArrayList<>();
    }
}
