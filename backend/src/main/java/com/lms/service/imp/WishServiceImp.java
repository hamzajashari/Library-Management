package com.lms.service.imp;

import com.lms.dto.BookOneDto;
import com.lms.dto.DeleteBookFromWish;
import com.lms.dto.WishDto;
import com.lms.dto.exception.BookAlreadyInCartException;
import com.lms.dto.exception.BookNotFoundException;
import com.lms.dto.exception.UserNotFoundException;
import com.lms.model.LibraryUser;
import com.lms.model.Wish;
import com.lms.repository.BookRepository;
import com.lms.repository.CartRepository;
import com.lms.repository.UserRepository;
import com.lms.repository.WishRepository;
import com.lms.service.BookService;
import com.lms.service.WishService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class WishServiceImp implements WishService {
    private final ModelMapper modelMapper;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    private final WishRepository wishRepository;
    private final BookRepository bookRepository;
    private final BookService bookService;

    public WishServiceImp(ModelMapper modelMapper, CartRepository cartRepository, UserRepository userRepository, WishRepository wishRepository, BookRepository bookRepository, BookService bookService) {
        this.modelMapper = modelMapper;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.wishRepository = wishRepository;
        this.bookRepository = bookRepository;
        this.bookService = bookService;
    }

    @Override
    public WishDto getActiveWish(String userId) {
        LibraryUser user = this.userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        Wish wish = this.wishRepository
                .findByLibraryUser(user)
                .orElseGet(() -> {
                    Wish newWish = new Wish(user);
                    return this.wishRepository.save(newWish);
                });

        WishDto wishDto = modelMapper.map(wish, WishDto.class);
        return wishDto;
    }

    @Override
    public boolean deleteBookFromWish(DeleteBookFromWish deleteBook) {
        if(deleteBook!=null){
            LibraryUser user= this.userRepository.findByUserId(deleteBook.getUserId()).orElseThrow(() -> new UserNotFoundException(deleteBook.getUserId()));
            user.getWishes().stream().filter(f->f.getId()==deleteBook.getWishId()).findFirst().get().getBookList().removeIf(book -> book.getId()== deleteBook.getBookId());
            this.userRepository.save(user);
            return true;
        }
        return false;
    }

    @Override
    public Wish getWish(String userId) {
        LibraryUser user = this.userRepository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        return this.wishRepository
                .findByLibraryUser(user)
                .orElseGet(() -> {
                    Wish wish = new Wish(user);
                    return this.wishRepository.save(wish);
                });
    }

    @Override
    public WishDto addProductToWish(String userId, Long bookId) {
        WishDto wishDto = this.getActiveWish(userId);

        BookOneDto book = this.bookService.getOne(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        if(wishDto.getBookList()
                .stream().filter(i -> i.getId().equals(bookId))
                .collect(Collectors.toList()).size() > 0)
            throw new BookAlreadyInCartException(bookId, userId);


        wishDto.getBookList().add(book);

        Wish wish = modelMapper.map(wishDto,Wish.class);
        wish.setLibraryUser(this.userRepository.findByUserId(userId).orElseThrow(()-> new UserNotFoundException(userId)));
        this.wishRepository.save(wish);

        return wishDto;
    }

    @Override
    public Wish save(Wish wish) {
        return this.wishRepository.save(wish);
    }
}
