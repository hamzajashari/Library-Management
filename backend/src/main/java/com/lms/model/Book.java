package com.lms.model;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "book")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	private Long id;

	@Column(name = "name", length = 300)
	private String name;

	@Column(name = "code", length = 300)
	private String code;

	@Column(name = "description", length=99999)
	private String description;

	@Column(name = "price", length = 100)
	private int price;

	@Column(name = "quantity", length = 100)
	private int quantity;

	@Column(name = "inventoryStatus", length = 100)
	private String inventoryStatus;

	@Column(name = "image", length = 9999)
	private String image;

	@Column(name = "rating", length = 100)
	private int rating;

	@Column(name = "category", length = 100)
	private String category;

	@NotNull
	@JoinColumn(name = "author_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Author author;

	@NotNull
	@JoinColumn(name = "publisher_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private Publisher publisher;

	@OneToMany(mappedBy = "book",
			cascade = CascadeType.ALL,
			fetch = FetchType.LAZY)
	private List<Comment> comment;

}
