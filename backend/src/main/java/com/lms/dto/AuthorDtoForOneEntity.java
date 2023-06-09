package com.lms.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
public class AuthorDtoForOneEntity {
	private Long id;

	@NotNull
	private String name;

	@NotNull
	private String surname;

	private String email;

	private String description;



}
