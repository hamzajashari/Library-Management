package com.lms.service.imp;

import com.lms.dto.PublisherDto;
import com.lms.dto.PublisherOneDto;
import com.lms.dto.PublisherUpdateDto;
import com.lms.dto.exception.NotFoundException;
import com.lms.model.Publisher;
import com.lms.repository.PublisherRepository;
import com.lms.repository.UserRepository;
import com.lms.service.PublisherService;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class PublisherServiceImp implements PublisherService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PublisherRepository publisherRepository;

    public PublisherServiceImp(ModelMapper modelMapper, UserRepository userRepository, PublisherRepository publisherRepository) {
        super();
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.publisherRepository = publisherRepository;
    }

    public PublisherDto save(PublisherDto PublisherDto) {
        Publisher publisherChecked = publisherRepository.findByEmail(PublisherDto.getEmail());
        if (publisherChecked != null) {
            throw new IllegalArgumentException("User email already exist");
        }
        Publisher publisher = modelMapper.map(PublisherDto, Publisher.class);
        publisherRepository.save(publisher);
        PublisherDto.setId(publisher.getId());
        return PublisherDto;
    }

    public List<PublisherDto> getAll() throws NotFoundException {
        List<Publisher> publishers = publisherRepository.findAll();
        if (publishers.size() < 1) {
            throw new NotFoundException("Publisher don't already exist");
        }
        PublisherDto[] publisherDtos = modelMapper.map(publishers, PublisherDto[].class);

        return Arrays.asList(publisherDtos);
    }

    public List<PublisherDto> findAllByName(String name) throws NotFoundException {
        List<Publisher> publishers = publisherRepository.findByNameOrSurname(name, name);
        if (publishers.size() < 1) {
            throw new NotFoundException("Publisher don't already exist");
        }
        PublisherDto[] publisherDtos = modelMapper.map(publishers, PublisherDto[].class);

        return Arrays.asList(publisherDtos);
    }

    public PublisherUpdateDto update(Long id, @Valid PublisherUpdateDto publisherUpdateDto) throws NotFoundException {
        Optional<Publisher> publisherOpt = publisherRepository.findById(id);
        if (!publisherOpt.isPresent()) {
            throw new NotFoundException("User doesn't exist : " + id);
        }
        Publisher publisher = modelMapper.map(publisherUpdateDto, Publisher.class);
        publisher.setId(id);
        publisherRepository.save(publisher);
        publisherUpdateDto.setId(publisher.getId());
        return publisherUpdateDto;

    }

    public PublisherOneDto getOne(Long id) throws NotFoundException {

        Optional<Publisher> publisher = publisherRepository.findById(id);
        if (!publisher.isPresent()) {
            throw new NotFoundException("User doesn't exist : " + id);
        }

        PublisherOneDto publisherOneDto = modelMapper.map(publisher.get(), PublisherOneDto.class);
        publisherOneDto.setId(id);
        publisherOneDto.getBooks().forEach(data -> {
            data.setPublisherId(id);
        });
        return publisherOneDto;

    }

    public Boolean delete(Long id) throws NotFoundException {

        Optional<Publisher> publisher = publisherRepository.findById(id);
        if (!publisher.isPresent()) {
            throw new NotFoundException("User doesn't exist : " + id);
        }
        publisherRepository.deleteById(id);
        return true;
    }
}
