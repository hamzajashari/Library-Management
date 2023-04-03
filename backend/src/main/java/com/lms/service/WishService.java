package com.lms.service;

import com.lms.dto.DeleteBookFromWish;
import com.lms.dto.WishDto;
import com.lms.model.Wish;

public interface WishService {

    WishDto getActiveWish(String userId);

    boolean deleteBookFromWish(DeleteBookFromWish deleteBook);

    Wish getWish(String userId);

    WishDto addProductToWish(String userId, Long bookId);

    Wish save(Wish wish);
}
