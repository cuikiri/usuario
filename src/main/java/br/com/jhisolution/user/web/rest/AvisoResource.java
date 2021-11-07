package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.domain.Aviso;
import br.com.jhisolution.user.service.AvisoService;
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
 * REST controller for managing {@link br.com.jhisolution.user.domain.Aviso}.
 */
@RestController
@RequestMapping("/api")
public class AvisoResource {

    private final Logger log = LoggerFactory.getLogger(AvisoResource.class);

    private static final String ENTITY_NAME = "userAviso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvisoService avisoService;

    public AvisoResource(AvisoService avisoService) {
        this.avisoService = avisoService;
    }

    /**
     * {@code POST  /avisos} : Create a new aviso.
     *
     * @param aviso the aviso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aviso, or with status {@code 400 (Bad Request)} if the aviso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/avisos")
    public ResponseEntity<Aviso> createAviso(@Valid @RequestBody Aviso aviso) throws URISyntaxException {
        log.debug("REST request to save Aviso : {}", aviso);
        if (aviso.getId() != null) {
            throw new BadRequestAlertException("A new aviso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aviso result = avisoService.save(aviso);
        return ResponseEntity.created(new URI("/api/avisos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /avisos} : Updates an existing aviso.
     *
     * @param aviso the aviso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aviso,
     * or with status {@code 400 (Bad Request)} if the aviso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aviso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/avisos")
    public ResponseEntity<Aviso> updateAviso(@Valid @RequestBody Aviso aviso) throws URISyntaxException {
        log.debug("REST request to update Aviso : {}", aviso);
        if (aviso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Aviso result = avisoService.save(aviso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, aviso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /avisos} : get all the avisos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avisos in body.
     */
    @GetMapping("/avisos")
    public ResponseEntity<List<Aviso>> getAllAvisos(Pageable pageable) {
        log.debug("REST request to get a page of Avisos");
        Page<Aviso> page = avisoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /avisos/:id} : get the "id" aviso.
     *
     * @param id the id of the aviso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aviso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/avisos/{id}")
    public ResponseEntity<Aviso> getAviso(@PathVariable Long id) {
        log.debug("REST request to get Aviso : {}", id);
        Optional<Aviso> aviso = avisoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(aviso);
    }

    /**
     * {@code DELETE  /avisos/:id} : delete the "id" aviso.
     *
     * @param id the id of the aviso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/avisos/{id}")
    public ResponseEntity<Void> deleteAviso(@PathVariable Long id) {
        log.debug("REST request to delete Aviso : {}", id);
        avisoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
