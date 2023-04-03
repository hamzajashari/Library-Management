package com.lms.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
public class WishDto {
    private Long id;
    private List<BookOneDto> bookList;
    private LocalDateTime dateCreated;
}
