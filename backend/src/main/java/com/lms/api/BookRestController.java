package com.lms.api;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.lms.dto.*;
import com.lms.dto.exception.BookNotFoundException;
import com.lms.dto.exception.NotFoundException;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lms.service.imp.AuthorServiceImp;
import com.lms.service.imp.BookServiceImp;
import com.lms.util.ApiPaths;


@RestController
@RequestMapping(ApiPaths.BookCtrl.CTRL)
@CrossOrigin
public class BookRestController {

	private final AuthorServiceImp authorServiceImp;
	private final BookServiceImp bookServiceImp;

	public BookRestController(AuthorServiceImp authorServiceImp, BookServiceImp bookServiceImp) {
		this.authorServiceImp = authorServiceImp;
		this.bookServiceImp = bookServiceImp;
	}


	@GetMapping()
	public ResponseEntity<List<BookDto>> getAll() throws NotFoundException {
		return ResponseEntity.ok(bookServiceImp.getAll());
	}

	@GetMapping("/filter")
	public ResponseEntity<List<BookDto>> getTopBooks() throws NotFoundException {

		List<BookDto> filter = bookServiceImp.getAll().stream().filter(f-> f.getRating()>=4).collect(Collectors.toList());
		return ResponseEntity.ok(filter);
	}

	// localhost:8182/api/book/5
	@GetMapping("/{id}")
	public ResponseEntity<BookOneDto> getById(@PathVariable(name = "id", required = true) Long id)
			throws NotFoundException {
		return ResponseEntity.ok(bookServiceImp.getOne(id).orElseThrow(() -> new BookNotFoundException(id)));
	}

	@GetMapping("/find/{name}")
	public ResponseEntity<List<BookDto>> findByName(@PathVariable(name = "name", required = true) String name)
			throws NotFoundException {

		if(name.isEmpty()){
			return ResponseEntity.ok(bookServiceImp.getAll());
		}
		return ResponseEntity.ok(bookServiceImp.SearchBooksByName(name));
	}

	@GetMapping("/inventoryStatus/{quantity}")
	public String inventoryStatus(@PathVariable(name = "quantity", required = true) int quantity )
			throws NotFoundException {
			if(quantity<25){
				return "LOWSTOCK";
			}
			else if(quantity>=25){
				return "INSTOCK";
			}
			return "NOSTOCK";

	}

	@GetMapping("/recentSales")
	public ResponseEntity<BookForDashboard[]> getRecentSales() throws StripeException {
		return ResponseEntity.ok(this.bookServiceImp.getRecentSales());
	}

	@GetMapping("/slope")
	public ResponseEntity.BodyBuilder getSlope()
	{
		this.bookServiceImp.Slope();
		return ResponseEntity.ok();
	}

	@GetMapping("/{id}/recommended")
	public BookRecDto[] getRecommended(@PathVariable(required = true) Long id)
	{
		return this.bookServiceImp.getRecommended(this.bookServiceImp.getOne(id).get());
	}


	@PostMapping()
	public ResponseEntity<BookOneDto> createProject(@Valid @RequestBody BookOneDto bookOneDto) throws Exception {
		return ResponseEntity.ok(bookServiceImp.save(bookOneDto));
	}
	@PutMapping("/{id}")
	public ResponseEntity<BookUpdateDto> updateBook(@PathVariable(name = "id", required = true) Long id,
			@Valid @RequestBody BookUpdateDto bookUpdateDto) throws NotFoundException {

		return ResponseEntity.ok(bookServiceImp.update(id, bookUpdateDto));
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteBook(@PathVariable(name = "id", required = true) Long id)
			throws NotFoundException {
		return ResponseEntity.ok(bookServiceImp.delete(id));
	}
}
