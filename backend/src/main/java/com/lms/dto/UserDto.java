package com.lms.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Data
public class UserDto {

	private Long id;

	private String firstname;

	private String lastname;

	private String email;

	private String username;

	private String university;

	private String address;

	private String city;

	private String state;

	private String zip;

	private String about;

	private String facebook;

	private String instagram;

	private String twitter;

	private String cartId;

}
