package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.domain.DadosPessoais;
import br.com.jhisolution.user.service.DadosPessoaisService;
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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link br.com.jhisolution.user.domain.DadosPessoais}.
 */
@RestController
@RequestMapping("/api")
public class DadosPessoaisResource {

    private final Logger log = LoggerFactory.getLogger(DadosPessoaisResource.class);

    private static final String ENTITY_NAME = "userDadosPessoais";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DadosPessoaisService dadosPessoaisService;

    public DadosPessoaisResource(DadosPessoaisService dadosPessoaisService) {
        this.dadosPessoaisService = dadosPessoaisService;
    }

    /**
     * {@code POST  /dados-pessoais} : Create a new dadosPessoais.
     *
     * @param dadosPessoais the dadosPessoais to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dadosPessoais, or with status {@code 400 (Bad Request)} if the dadosPessoais has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/dados-pessoais")
    public ResponseEntity<DadosPessoais> createDadosPessoais(@Valid @RequestBody DadosPessoais dadosPessoais) throws URISyntaxException {
        log.debug("REST request to save DadosPessoais : {}", dadosPessoais);
        if (dadosPessoais.getId() != null) {
            throw new BadRequestAlertException("A new dadosPessoais cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DadosPessoais result = dadosPessoaisService.save(dadosPessoais);
        return ResponseEntity.created(new URI("/api/dados-pessoais/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /dados-pessoais} : Updates an existing dadosPessoais.
     *
     * @param dadosPessoais the dadosPessoais to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dadosPessoais,
     * or with status {@code 400 (Bad Request)} if the dadosPessoais is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dadosPessoais couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/dados-pessoais")
    public ResponseEntity<DadosPessoais> updateDadosPessoais(@Valid @RequestBody DadosPessoais dadosPessoais) throws URISyntaxException {
        log.debug("REST request to update DadosPessoais : {}", dadosPessoais);
        if (dadosPessoais.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DadosPessoais result = dadosPessoaisService.save(dadosPessoais);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dadosPessoais.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /dados-pessoais} : get all the dadosPessoais.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dadosPessoais in body.
     */
    @GetMapping("/dados-pessoais")
    public ResponseEntity<List<DadosPessoais>> getAllDadosPessoais(Pageable pageable, @RequestParam(required = false) String filter) {
        if ("user-is-null".equals(filter)) {
            log.debug("REST request to get all DadosPessoaiss where user is null");
            return new ResponseEntity<>(dadosPessoaisService.findAllWhereUserIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of DadosPessoais");
        Page<DadosPessoais> page = dadosPessoaisService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /dados-pessoais/:id} : get the "id" dadosPessoais.
     *
     * @param id the id of the dadosPessoais to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dadosPessoais, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/dados-pessoais/{id}")
    public ResponseEntity<DadosPessoais> getDadosPessoais(@PathVariable Long id) {
        log.debug("REST request to get DadosPessoais : {}", id);
        Optional<DadosPessoais> dadosPessoais = dadosPessoaisService.findOne(id);
        return ResponseUtil.wrapOrNotFound(dadosPessoais);
    }

    /**
     * {@code DELETE  /dados-pessoais/:id} : delete the "id" dadosPessoais.
     *
     * @param id the id of the dadosPessoais to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/dados-pessoais/{id}")
    public ResponseEntity<Void> deleteDadosPessoais(@PathVariable Long id) {
        log.debug("REST request to delete DadosPessoais : {}", id);
        dadosPessoaisService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
