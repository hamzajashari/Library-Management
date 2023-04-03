package com.lms.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@Data
public class PublisherDto {
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String surname;

    private String description;

    private String email;

    private List<BookDtoForOneEntity> books;

}
