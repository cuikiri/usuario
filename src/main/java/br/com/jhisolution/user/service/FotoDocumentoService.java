package br.com.jhisolution.user.service;

import br.com.jhisolution.user.domain.FotoDocumento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link FotoDocumento}.
 */
public interface FotoDocumentoService {

    /**
     * Save a fotoDocumento.
     *
     * @param fotoDocumento the entity to save.
     * @return the persisted entity.
     */
    FotoDocumento save(FotoDocumento fotoDocumento);

    /**
     * Get all the fotoDocumentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FotoDocumento> findAll(Pageable pageable);


    /**
     * Get the "id" fotoDocumento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FotoDocumento> findOne(Long id);

    /**
     * Delete the "id" fotoDocumento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
