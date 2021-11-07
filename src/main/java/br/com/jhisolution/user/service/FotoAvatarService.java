package br.com.jhisolution.user.service;

import br.com.jhisolution.user.domain.FotoAvatar;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link FotoAvatar}.
 */
public interface FotoAvatarService {

    /**
     * Save a fotoAvatar.
     *
     * @param fotoAvatar the entity to save.
     * @return the persisted entity.
     */
    FotoAvatar save(FotoAvatar fotoAvatar);

    /**
     * Get all the fotoAvatars.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FotoAvatar> findAll(Pageable pageable);


    /**
     * Get the "id" fotoAvatar.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FotoAvatar> findOne(Long id);

    /**
     * Delete the "id" fotoAvatar.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
