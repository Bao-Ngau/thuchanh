package com.example.thuchanh.service.impl;

import com.example.thuchanh.entity.Author;
import com.example.thuchanh.repository.AuthorRepository;
import com.example.thuchanh.service.IAuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorService implements IAuthorService {
    private final AuthorRepository authorRepository;
    @Override
    public Page<Author> getAllCategory(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return authorRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public Author addAuthor(Author author,String username) {
        var newAuthor = Author.builder()
                .name(author.getName())
                .createddate(new Date())
                .createdby(username)
                .build();
        return authorRepository.save(newAuthor);
    }

    @Transactional
    @Override
    public Author updateAuthor(Author author,String username) {
        Optional<Author> optionalAuthor = authorRepository.findById(author.getId());
        Author newAuthor = optionalAuthor.get();
        if (optionalAuthor.isPresent()){
            newAuthor.setName(author.getName());
            newAuthor.setCreateddate(new Date());
            newAuthor.setCreatedby(username+"(đã sửa)");
        }
        return authorRepository.save(newAuthor);
    }

    @Transactional
    @Override
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }

    @Override
    public Author searchAuthor(String name) {
        return authorRepository.findByName(name).get();
    }

    @Transactional
    @Override
    public Boolean isCheckName(String name) {
        if (authorRepository.countByName(name) >=1 ){
            return true;
        }
        return false;
    }
    @Override
    public List<Author> findAll() {
        return authorRepository.findAll();
    }
}
