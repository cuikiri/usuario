package br.com.jhisolution.user.repository;

import br.com.jhisolution.user.domain.DadosPessoais;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DadosPessoais entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DadosPessoaisRepository extends JpaRepository<DadosPessoais, Long> {
}
