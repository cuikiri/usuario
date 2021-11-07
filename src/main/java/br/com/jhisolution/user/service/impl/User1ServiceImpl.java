package br.com.jhisolution.user.service.impl;

import br.com.jhisolution.user.service.User1Service;
import br.com.jhisolution.user.domain.User1;
import br.com.jhisolution.user.repository.User1Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link User1}.
 */
@Service
@Transactional
public class User1ServiceImpl implements User1Service {

    private final Logger log = LoggerFactory.getLogger(User1ServiceImpl.class);

    private final User1Repository user1Repository;

    public User1ServiceImpl(User1Repository user1Repository) {
        this.user1Repository = user1Repository;
    }

    @Override
    public User1 save(User1 user1) {
        log.debug("Request to save User1 : {}", user1);
        return user1Repository.save(user1);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User1> findAll(Pageable pageable) {
        log.debug("Request to get all User1s");
        return user1Repository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<User1> findOne(Long id) {
        log.debug("Request to get User1 : {}", id);
        return user1Repository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete User1 : {}", id);
        user1Repository.deleteById(id);
    }
}
