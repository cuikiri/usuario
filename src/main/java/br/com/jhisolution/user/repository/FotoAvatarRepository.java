package br.com.jhisolution.user.repository;

import br.com.jhisolution.user.domain.FotoAvatar;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FotoAvatar entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FotoAvatarRepository extends JpaRepository<FotoAvatar, Long> {
}
