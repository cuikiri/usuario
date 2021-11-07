package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.domain.Mensagem;
import br.com.jhisolution.user.service.MensagemService;
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
 * REST controller for managing {@link br.com.jhisolution.user.domain.Mensagem}.
 */
@RestController
@RequestMapping("/api")
public class MensagemResource {

    private final Logger log = LoggerFactory.getLogger(MensagemResource.class);

    private static final String ENTITY_NAME = "userMensagem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MensagemService mensagemService;

    public MensagemResource(MensagemService mensagemService) {
        this.mensagemService = mensagemService;
    }

    /**
     * {@code POST  /mensagems} : Create a new mensagem.
     *
     * @param mensagem the mensagem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mensagem, or with status {@code 400 (Bad Request)} if the mensagem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mensagems")
    public ResponseEntity<Mensagem> createMensagem(@Valid @RequestBody Mensagem mensagem) throws URISyntaxException {
        log.debug("REST request to save Mensagem : {}", mensagem);
        if (mensagem.getId() != null) {
            throw new BadRequestAlertException("A new mensagem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mensagem result = mensagemService.save(mensagem);
        return ResponseEntity.created(new URI("/api/mensagems/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mensagems} : Updates an existing mensagem.
     *
     * @param mensagem the mensagem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mensagem,
     * or with status {@code 400 (Bad Request)} if the mensagem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mensagem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mensagems")
    public ResponseEntity<Mensagem> updateMensagem(@Valid @RequestBody Mensagem mensagem) throws URISyntaxException {
        log.debug("REST request to update Mensagem : {}", mensagem);
        if (mensagem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mensagem result = mensagemService.save(mensagem);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mensagem.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /mensagems} : get all the mensagems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mensagems in body.
     */
    @GetMapping("/mensagems")
    public ResponseEntity<List<Mensagem>> getAllMensagems(Pageable pageable) {
        log.debug("REST request to get a page of Mensagems");
        Page<Mensagem> page = mensagemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /mensagems/:id} : get the "id" mensagem.
     *
     * @param id the id of the mensagem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mensagem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mensagems/{id}")
    public ResponseEntity<Mensagem> getMensagem(@PathVariable Long id) {
        log.debug("REST request to get Mensagem : {}", id);
        Optional<Mensagem> mensagem = mensagemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mensagem);
    }

    /**
     * {@code DELETE  /mensagems/:id} : delete the "id" mensagem.
     *
     * @param id the id of the mensagem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mensagems/{id}")
    public ResponseEntity<Void> deleteMensagem(@PathVariable Long id) {
        log.debug("REST request to delete Mensagem : {}", id);
        mensagemService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
