package com.lms.model;

import java.util.*;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.lms.model.enumerations.Role;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Getter
@Setter
@Entity(name="LibraryUser")
@NoArgsConstructor

public class LibraryUser implements UserDetails {

	@Id
	@Column(name = "id", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "userId", unique=true)
	private String userId;

	@Column(name = "firstname", length = 100)
	private String firstname;

	@Column(name = "lastname", length = 100)
	private String lastname;

	@Column(name = "email", length = 100, unique = true)
	private String email;

	@NotNull
	@Column(name = "username", length = 100, unique = true)
	private String username;

	@NotNull
	@Column(name = "pwd", length = 300)
	private String password;

	@NotNull
	@Column(name = "realpwd", length = 300)
	private String realPassword;

	@Column(name = "university", length = 3000)
	private String university;

	@Column(name = "address", length = 300)
	private String address;

	@Column(name = "city", length = 300)
	private String city;

	@Column(name = "state", length = 300)
	private String state;

	@Column(name = "zip", length = 300)
	private String zip;

	@Column(name = "about", length = 300)
	private String about;

	@Column(name = "facebook", length = 300)
	private String facebook;

	@Column(name = "instagram", length = 300)
	private String instagram;

	@Column(name = "twitter", length = 300)
	private String twitter;

	@OneToMany(mappedBy = "libraryUser", fetch = FetchType.LAZY)
	private List<Cart> carts;

	@OneToMany(mappedBy = "libraryUser", fetch = FetchType.LAZY)
	private List<Wish> wishes;

	@Column(name = "date_created")
	private Date dateCreated;
	@Enumerated(value = EnumType.STRING)
	private Role role;
	private boolean isAccountNonExpired = true;
	private boolean isAccountNonLocked = true;
	private boolean isCredentialsNonExpired = true;
	private boolean isEnabled = true;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(role);
	}

	@Override
	public boolean isAccountNonExpired() {
		return isAccountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return isCredentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return isEnabled;
	}

}

