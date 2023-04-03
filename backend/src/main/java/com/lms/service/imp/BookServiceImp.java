package com.lms.service.imp;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.lms.dto.*;
import com.lms.dto.exception.BookNotFoundException;
import com.lms.dto.exception.NotFoundException;
import com.lms.ml.SlopeOne;
import com.lms.model.Publisher;
import com.lms.repository.PublisherRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lms.model.Author;
import com.lms.model.Book;
import com.lms.repository.AuthorRepository;
import com.lms.repository.BookRepository;
import com.lms.repository.UserRepository;
import com.lms.service.BookService;

@Service
public class BookServiceImp implements BookService {
	private final ModelMapper modelMapper;
	private final UserRepository userRepository;
	private final AuthorRepository authorRepository;
	private final PublisherRepository publisherRepository;
	private final BookRepository bookRepository;

	public BookServiceImp(ModelMapper modelMapper, UserRepository userRepository, AuthorRepository authorRepository,
						  PublisherRepository publisherRepository, BookRepository bookRepository) {
		super();
		this.modelMapper = modelMapper;
		this.userRepository = userRepository;
		this.authorRepository = authorRepository;
		this.publisherRepository = publisherRepository;
		this.bookRepository = bookRepository;
	}

	public BookOneDto save(BookOneDto bookOneDto) throws Exception {

		if(bookRepository.findByName(bookOneDto.getName()).size()>0){
			throw new Exception("Book already exist");
		}
		Book book = modelMapper.map(bookOneDto, Book.class);
		Optional<Author> authorOpt = authorRepository.findById(bookOneDto.getAuthorId());
		book.setAuthor(authorOpt.get());
		Optional<Publisher> publisherOpt = publisherRepository.findById(bookOneDto.getPublisherId());
		book.setPublisher(publisherOpt.get());

		bookRepository.save(book);

		bookOneDto.setId(book.getId());
		return bookOneDto;
	}

	public List<BookDto> getAll() throws NotFoundException {

		List<Book> books = bookRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
		if (books.size() < 1) {
			throw new NotFoundException("No book");
		}
		BookDto[] bookDtos = modelMapper.map(books, BookDto[].class);
		return Arrays.asList(bookDtos);

	}

	@Transactional
	public BookUpdateDto update(Long id, BookUpdateDto bookUpdateDto) throws NotFoundException {

		Optional<Book> bookOpt = bookRepository.findById(id);
		if (!bookOpt.isPresent()) {
			throw new NotFoundException("Book does not exist id : " + id);
		}
		Optional<Author> author = authorRepository.findById(bookUpdateDto.getAuthorId());
		if (!author.isPresent()) {
			throw new NotFoundException("Author does not exist id : " + bookUpdateDto.getAuthorId());
		}
		Book book = modelMapper.map(bookUpdateDto, Book.class);
		Optional<Author> authorOpt = authorRepository.findById(bookUpdateDto.getAuthorId());
		book.setAuthor(authorOpt.get());
		Optional<Publisher> publisherOpt = publisherRepository.findById(bookUpdateDto.getPublisherId());
		book.setPublisher(publisherOpt.get());

		bookRepository.save(book);

		return bookUpdateDto;

	}

	public Optional<BookOneDto> getOne(Long id) throws NotFoundException {

		Optional<Book> book = bookRepository.findById(id);
		if (!book.isPresent()) {
			throw new NotFoundException("Book does not exist id : " + id);
		}
		BookOneDto bookOneDto = modelMapper.map(book.get(), BookOneDto.class);
		bookOneDto.setId(id);
		bookOneDto.setAuthorId(book.get().getAuthor().getId());
		bookOneDto.setPublisherId(book.get().getPublisher().getId());

		return Optional.of(bookOneDto);

	}

	@Override
	public Optional<Book> getById(Long id) throws NotFoundException {
		return Optional.of(bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException(id)));
	}

	public Boolean delete(Long id) throws NotFoundException {

		Optional<Book> book = bookRepository.findById(id);
		if (!book.isPresent()) {
			throw new NotFoundException("Book does not exist id : " + id);
		}
		bookRepository.deleteById(id);
		return true;

	}

	public List<BookDto> SearchBooksByName(String name) throws NotFoundException {
		List<Book> books = bookRepository.SearchBooksByName(name.trim());
		if (books.size() < 1) {
			throw new NotFoundException("Book don't already exist");
		}
		BookDto[] bookDtos = modelMapper.map(books, BookDto[].class);
		return Arrays.asList(bookDtos);
	}

	@Override
	public void Slope() {
		SlopeOne.slopeOne(this.userRepository.findAll().size());
	}

	public BookRecDto[] getRecommended(BookOneDto bookOneDto)
	{
		BookRecDto[] bookDtos = modelMapper.map(this.bookRepository.getRecommended(bookOneDto.getCategory(),bookOneDto.getId()), BookRecDto[].class);
		return bookDtos;
	}
	@Override
	public BookForDashboard[] getRecentSales() {
		List<Book> bookOneDtos= this.bookRepository.getRecentSales();
		BookForDashboard[] bookForDashboards = modelMapper.map(bookOneDtos, BookForDashboard[].class);
		return  bookForDashboards;
	}
}
