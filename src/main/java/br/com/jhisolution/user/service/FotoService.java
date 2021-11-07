package br.com.jhisolution.user.service;

import br.com.jhisolution.user.domain.Foto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Foto}.
 */
public interface FotoService {

    /**
     * Save a foto.
     *
     * @param foto the entity to save.
     * @return the persisted entity.
     */
    Foto save(Foto foto);

    /**
     * Get all the fotos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Foto> findAll(Pageable pageable);


    /**
     * Get the "id" foto.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Foto> findOne(Long id);

    /**
     * Delete the "id" foto.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
