package com.lms.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Data
public class BookDto {

	private Long id;

	@NotNull
	private String name;

	@NotNull
	private String code;

	private String description;

	private int price;

	private int quantity;

	private String inventoryStatus;

	private String image;

	private int rating;

	private String category;

	private AuthorDtoForOneEntity author;

	private PublisherDtoForOneEntity publisher;

}
