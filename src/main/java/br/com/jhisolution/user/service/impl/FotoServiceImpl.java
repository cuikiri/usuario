package br.com.jhisolution.user.service.impl;

import br.com.jhisolution.user.service.FotoService;
import br.com.jhisolution.user.domain.Foto;
import br.com.jhisolution.user.repository.FotoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Foto}.
 */
@Service
@Transactional
public class FotoServiceImpl implements FotoService {

    private final Logger log = LoggerFactory.getLogger(FotoServiceImpl.class);

    private final FotoRepository fotoRepository;

    public FotoServiceImpl(FotoRepository fotoRepository) {
        this.fotoRepository = fotoRepository;
    }

    @Override
    public Foto save(Foto foto) {
        log.debug("Request to save Foto : {}", foto);
        return fotoRepository.save(foto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Foto> findAll(Pageable pageable) {
        log.debug("Request to get all Fotos");
        return fotoRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Foto> findOne(Long id) {
        log.debug("Request to get Foto : {}", id);
        return fotoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Foto : {}", id);
        fotoRepository.deleteById(id);
    }
}
