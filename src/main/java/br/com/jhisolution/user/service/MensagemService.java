package br.com.jhisolution.user.service;

import br.com.jhisolution.user.domain.Mensagem;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Mensagem}.
 */
public interface MensagemService {

    /**
     * Save a mensagem.
     *
     * @param mensagem the entity to save.
     * @return the persisted entity.
     */
    Mensagem save(Mensagem mensagem);

    /**
     * Get all the mensagems.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Mensagem> findAll(Pageable pageable);


    /**
     * Get the "id" mensagem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Mensagem> findOne(Long id);

    /**
     * Delete the "id" mensagem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
