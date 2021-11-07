package br.com.jhisolution.user.service;

import br.com.jhisolution.user.domain.Aviso;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Aviso}.
 */
public interface AvisoService {

    /**
     * Save a aviso.
     *
     * @param aviso the entity to save.
     * @return the persisted entity.
     */
    Aviso save(Aviso aviso);

    /**
     * Get all the avisos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Aviso> findAll(Pageable pageable);


    /**
     * Get the "id" aviso.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Aviso> findOne(Long id);

    /**
     * Delete the "id" aviso.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
