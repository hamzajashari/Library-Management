package com.lms.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeleteBookFromWish {
    private String userId;
    private Long wishId;
    private Long bookId;

    public DeleteBookFromWish(String userId, Long wishId, Long bookId) {
        this.userId = userId;
        this.wishId = wishId;
        this.bookId = bookId;
    }
}
