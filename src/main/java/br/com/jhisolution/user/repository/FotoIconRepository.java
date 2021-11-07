package br.com.jhisolution.user.repository;

import br.com.jhisolution.user.domain.FotoIcon;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FotoIcon entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FotoIconRepository extends JpaRepository<FotoIcon, Long> {
}
