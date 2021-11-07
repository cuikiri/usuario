package br.com.jhisolution.user.repository;

import br.com.jhisolution.user.domain.FotoDocumento;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FotoDocumento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FotoDocumentoRepository extends JpaRepository<FotoDocumento, Long> {
}
