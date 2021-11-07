package br.com.jhisolution.user.repository;

import br.com.jhisolution.user.domain.Aviso;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Aviso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvisoRepository extends JpaRepository<Aviso, Long> {
}
