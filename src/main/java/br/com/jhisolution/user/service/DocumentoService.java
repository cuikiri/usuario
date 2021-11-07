package br.com.jhisolution.user.service;

import br.com.jhisolution.user.domain.Documento;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Documento}.
 */
public interface DocumentoService {

    /**
     * Save a documento.
     *
     * @param documento the entity to save.
     * @return the persisted entity.
     */
    Documento save(Documento documento);

    /**
     * Get all the documentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Documento> findAll(Pageable pageable);


    /**
     * Get the "id" documento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Documento> findOne(Long id);

    /**
     * Delete the "id" documento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
