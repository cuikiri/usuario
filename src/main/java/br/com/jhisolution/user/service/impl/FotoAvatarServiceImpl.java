package br.com.jhisolution.user.service.impl;

import br.com.jhisolution.user.service.FotoAvatarService;
import br.com.jhisolution.user.domain.FotoAvatar;
import br.com.jhisolution.user.repository.FotoAvatarRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link FotoAvatar}.
 */
@Service
@Transactional
public class FotoAvatarServiceImpl implements FotoAvatarService {

    private final Logger log = LoggerFactory.getLogger(FotoAvatarServiceImpl.class);

    private final FotoAvatarRepository fotoAvatarRepository;

    public FotoAvatarServiceImpl(FotoAvatarRepository fotoAvatarRepository) {
        this.fotoAvatarRepository = fotoAvatarRepository;
    }

    @Override
    public FotoAvatar save(FotoAvatar fotoAvatar) {
        log.debug("Request to save FotoAvatar : {}", fotoAvatar);
        return fotoAvatarRepository.save(fotoAvatar);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FotoAvatar> findAll(Pageable pageable) {
        log.debug("Request to get all FotoAvatars");
        return fotoAvatarRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<FotoAvatar> findOne(Long id) {
        log.debug("Request to get FotoAvatar : {}", id);
        return fotoAvatarRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete FotoAvatar : {}", id);
        fotoAvatarRepository.deleteById(id);
    }
}
