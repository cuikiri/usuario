package br.com.jhisolution.user.repository;

import br.com.jhisolution.user.domain.Mensagem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Mensagem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
}
