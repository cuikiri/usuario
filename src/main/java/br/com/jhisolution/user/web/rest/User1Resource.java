package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.domain.User1;
import br.com.jhisolution.user.service.User1Service;
import br.com.jhisolution.user.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.jhisolution.user.domain.User1}.
 */
@RestController
@RequestMapping("/api")
public class User1Resource {

    private final Logger log = LoggerFactory.getLogger(User1Resource.class);

    private static final String ENTITY_NAME = "userUser1";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final User1Service user1Service;

    public User1Resource(User1Service user1Service) {
        this.user1Service = user1Service;
    }

    /**
     * {@code POST  /user-1-s} : Create a new user1.
     *
     * @param user1 the user1 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new user1, or with status {@code 400 (Bad Request)} if the user1 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-1-s")
    public ResponseEntity<User1> createUser1(@Valid @RequestBody User1 user1) throws URISyntaxException {
        log.debug("REST request to save User1 : {}", user1);
        if (user1.getId() != null) {
            throw new BadRequestAlertException("A new user1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        User1 result = user1Service.save(user1);
        return ResponseEntity.created(new URI("/api/user-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-1-s} : Updates an existing user1.
     *
     * @param user1 the user1 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated user1,
     * or with status {@code 400 (Bad Request)} if the user1 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the user1 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-1-s")
    public ResponseEntity<User1> updateUser1(@Valid @RequestBody User1 user1) throws URISyntaxException {
        log.debug("REST request to update User1 : {}", user1);
        if (user1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        User1 result = user1Service.save(user1);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, user1.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-1-s} : get all the user1s.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of user1s in body.
     */
    @GetMapping("/user-1-s")
    public ResponseEntity<List<User1>> getAllUser1s(Pageable pageable) {
        log.debug("REST request to get a page of User1s");
        Page<User1> page = user1Service.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /user-1-s/:id} : get the "id" user1.
     *
     * @param id the id of the user1 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the user1, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-1-s/{id}")
    public ResponseEntity<User1> getUser1(@PathVariable Long id) {
        log.debug("REST request to get User1 : {}", id);
        Optional<User1> user1 = user1Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(user1);
    }

    /**
     * {@code DELETE  /user-1-s/:id} : delete the "id" user1.
     *
     * @param id the id of the user1 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-1-s/{id}")
    public ResponseEntity<Void> deleteUser1(@PathVariable Long id) {
        log.debug("REST request to delete User1 : {}", id);
        user1Service.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
