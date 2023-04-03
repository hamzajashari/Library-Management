package com.lms.api;

import javax.validation.Valid;

import com.lms.dto.UserDashboard;
import com.lms.dto.UserDto;
import com.lms.dto.exception.NotFoundException;
import com.lms.dto.UserPasswordDto;
import com.lms.service.imp.UserServiceImp;
import com.lms.util.ApiPaths;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.UserCtrl.CTRL)
@CrossOrigin
public class UserController {

	private final UserServiceImp userServiceImp;

	public UserController(UserServiceImp userServiceImp) {
		this.userServiceImp = userServiceImp;
	}


	@GetMapping("/{username}")
	public ResponseEntity<UserDto> findByUserName(@PathVariable(name = "username", required = true) String username)
			throws NotFoundException {
		return ResponseEntity.ok(userServiceImp.findByUserName(username));
	}

	@GetMapping("/usersCount")
	public ResponseEntity<UserDashboard> getUsers()
	{
		return ResponseEntity.ok(userServiceImp.getUsersCount());
	}
	@PutMapping("/{username}")
	public ResponseEntity<Boolean> updateUser(@PathVariable(name = "username", required = true) String username,
			@Valid @RequestBody UserDto userDto) throws NotFoundException {
		return ResponseEntity.ok(userServiceImp.update(username, userDto));
	}

	@PatchMapping("/change-password")
	public ResponseEntity<Boolean> signUp(@RequestBody UserPasswordDto userPasswordDto) throws NotFoundException {

		Boolean result = userServiceImp.changePassword(userPasswordDto);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/getUsersCount")
	public ResponseEntity<UserDashboard> getUsersCount() {
		return ResponseEntity.ok(userServiceImp.getUsersCount());
	}

	@GetMapping("/usersMonthly")
	public ResponseEntity<List<Integer>> UsersMonthly(){
		return ResponseEntity.ok(userServiceImp.UsersMonthly());
	}

}
