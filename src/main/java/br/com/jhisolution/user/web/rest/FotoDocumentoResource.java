package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.domain.FotoDocumento;
import br.com.jhisolution.user.service.FotoDocumentoService;
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
 * REST controller for managing {@link br.com.jhisolution.user.domain.FotoDocumento}.
 */
@RestController
@RequestMapping("/api")
public class FotoDocumentoResource {

    private final Logger log = LoggerFactory.getLogger(FotoDocumentoResource.class);

    private static final String ENTITY_NAME = "fotoFotoDocumento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FotoDocumentoService fotoDocumentoService;

    public FotoDocumentoResource(FotoDocumentoService fotoDocumentoService) {
        this.fotoDocumentoService = fotoDocumentoService;
    }

    /**
     * {@code POST  /foto-documentos} : Create a new fotoDocumento.
     *
     * @param fotoDocumento the fotoDocumento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fotoDocumento, or with status {@code 400 (Bad Request)} if the fotoDocumento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/foto-documentos")
    public ResponseEntity<FotoDocumento> createFotoDocumento(@Valid @RequestBody FotoDocumento fotoDocumento) throws URISyntaxException {
        log.debug("REST request to save FotoDocumento : {}", fotoDocumento);
        if (fotoDocumento.getId() != null) {
            throw new BadRequestAlertException("A new fotoDocumento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FotoDocumento result = fotoDocumentoService.save(fotoDocumento);
        return ResponseEntity.created(new URI("/api/foto-documentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /foto-documentos} : Updates an existing fotoDocumento.
     *
     * @param fotoDocumento the fotoDocumento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fotoDocumento,
     * or with status {@code 400 (Bad Request)} if the fotoDocumento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fotoDocumento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/foto-documentos")
    public ResponseEntity<FotoDocumento> updateFotoDocumento(@Valid @RequestBody FotoDocumento fotoDocumento) throws URISyntaxException {
        log.debug("REST request to update FotoDocumento : {}", fotoDocumento);
        if (fotoDocumento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FotoDocumento result = fotoDocumentoService.save(fotoDocumento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fotoDocumento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /foto-documentos} : get all the fotoDocumentos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fotoDocumentos in body.
     */
    @GetMapping("/foto-documentos")
    public ResponseEntity<List<FotoDocumento>> getAllFotoDocumentos(Pageable pageable) {
        log.debug("REST request to get a page of FotoDocumentos");
        Page<FotoDocumento> page = fotoDocumentoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /foto-documentos/:id} : get the "id" fotoDocumento.
     *
     * @param id the id of the fotoDocumento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fotoDocumento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/foto-documentos/{id}")
    public ResponseEntity<FotoDocumento> getFotoDocumento(@PathVariable Long id) {
        log.debug("REST request to get FotoDocumento : {}", id);
        Optional<FotoDocumento> fotoDocumento = fotoDocumentoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fotoDocumento);
    }

    /**
     * {@code DELETE  /foto-documentos/:id} : delete the "id" fotoDocumento.
     *
     * @param id the id of the fotoDocumento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/foto-documentos/{id}")
    public ResponseEntity<Void> deleteFotoDocumento(@PathVariable Long id) {
        log.debug("REST request to delete FotoDocumento : {}", id);
        fotoDocumentoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
