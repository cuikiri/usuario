package br.com.jhisolution.user.service;

import br.com.jhisolution.user.domain.DadosPessoais;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link DadosPessoais}.
 */
public interface DadosPessoaisService {

    /**
     * Save a dadosPessoais.
     *
     * @param dadosPessoais the entity to save.
     * @return the persisted entity.
     */
    DadosPessoais save(DadosPessoais dadosPessoais);

    /**
     * Get all the dadosPessoais.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DadosPessoais> findAll(Pageable pageable);
    /**
     * Get all the DadosPessoaisDTO where User is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<DadosPessoais> findAllWhereUserIsNull();


    /**
     * Get the "id" dadosPessoais.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DadosPessoais> findOne(Long id);

    /**
     * Delete the "id" dadosPessoais.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
