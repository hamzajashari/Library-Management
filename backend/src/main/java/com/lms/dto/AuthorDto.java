package com.lms.dto;

import java.util.List;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AuthorDto {

	private Long id;

	@NotNull
	private String name;

	@NotNull
	private String surname;

	private String description;

	private String email;

	private List<BookDtoForOneEntity> books;

}
