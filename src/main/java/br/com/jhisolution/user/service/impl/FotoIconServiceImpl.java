package br.com.jhisolution.user.service.impl;

import br.com.jhisolution.user.service.FotoIconService;
import br.com.jhisolution.user.domain.FotoIcon;
import br.com.jhisolution.user.repository.FotoIconRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link FotoIcon}.
 */
@Service
@Transactional
public class FotoIconServiceImpl implements FotoIconService {

    private final Logger log = LoggerFactory.getLogger(FotoIconServiceImpl.class);

    private final FotoIconRepository fotoIconRepository;

    public FotoIconServiceImpl(FotoIconRepository fotoIconRepository) {
        this.fotoIconRepository = fotoIconRepository;
    }

    @Override
    public FotoIcon save(FotoIcon fotoIcon) {
        log.debug("Request to save FotoIcon : {}", fotoIcon);
        return fotoIconRepository.save(fotoIcon);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FotoIcon> findAll(Pageable pageable) {
        log.debug("Request to get all FotoIcons");
        return fotoIconRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<FotoIcon> findOne(Long id) {
        log.debug("Request to get FotoIcon : {}", id);
        return fotoIconRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete FotoIcon : {}", id);
        fotoIconRepository.deleteById(id);
    }
}
