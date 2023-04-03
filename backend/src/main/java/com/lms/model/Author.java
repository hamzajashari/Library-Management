package com.lms.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "author")
public class Author {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Column(name = "name", length = 100)
	private String name;

	@NotNull
	@Column(name = "surname", length = 100)
	private String surname;

	@Column(name = "email", length = 100, unique = true)
	private String email;

	@Column(name = "description", length = 8000)
	private String description;

	@OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Book> books;
}
