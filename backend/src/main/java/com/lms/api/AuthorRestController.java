package com.lms.api;

import java.util.List;

import javax.validation.Valid;

import com.lms.dto.exception.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.lms.dto.AuthorDto;
import com.lms.dto.AuthorOneDto;
import com.lms.dto.AuthorUpdateDto;
import com.lms.service.imp.AuthorServiceImp;
import com.lms.util.ApiPaths;


@RestController
@RequestMapping(ApiPaths.AuthorCtrl.CTRL)
@CrossOrigin
public class AuthorRestController {

	private final AuthorServiceImp authorServiceImp;

	public AuthorRestController(AuthorServiceImp authorServiceImp) {
		super();
		this.authorServiceImp = authorServiceImp;
	}

	// http://localhost:8081/api/author
	@GetMapping()
	public ResponseEntity<List<AuthorDto>> getAll() throws NotFoundException {
		List<AuthorDto> authorDtos = authorServiceImp.getAll();
		return ResponseEntity.ok(authorDtos);
	}


	// http://localhost:8081/api/author/find?name=name
	@GetMapping("/find")
	public ResponseEntity<List<AuthorDto>> findAllByName(@RequestParam String name) throws NotFoundException {
		List<AuthorDto> authorDtos = authorServiceImp.findAllByName(name);
		if(authorDtos.isEmpty()){
			return ResponseEntity.ok(authorServiceImp.getAll());
		}
		return ResponseEntity.ok(authorDtos);
	}

	// http://localhost:8081/api/author/2
	@GetMapping("/{id}")
	public ResponseEntity<AuthorOneDto> getOneAuthor(@PathVariable(name = "id", required = true) Long id)
			throws NotFoundException {
		return ResponseEntity.ok(authorServiceImp.getOne(id));
	}

	@PostMapping()
	public ResponseEntity<AuthorDto> createAuthor(@Valid @RequestBody AuthorDto authorDto) {
		return ResponseEntity.ok(authorServiceImp.save(authorDto));
	}

	@PutMapping("/{id}")
	public ResponseEntity<AuthorUpdateDto> updateAuthor(@PathVariable(name = "id", required = true) Long id,
			@Valid @RequestBody AuthorUpdateDto authorUpdateDto) throws NotFoundException {
		return ResponseEntity.ok(authorServiceImp.update(id, authorUpdateDto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteBook(@PathVariable(name = "id", required = true) Long id)
			throws NotFoundException {
		return ResponseEntity.ok(authorServiceImp.delete(id));
	}

}
