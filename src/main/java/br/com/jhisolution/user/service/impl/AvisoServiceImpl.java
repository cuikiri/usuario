package br.com.jhisolution.user.service.impl;

import br.com.jhisolution.user.service.AvisoService;
import br.com.jhisolution.user.domain.Aviso;
import br.com.jhisolution.user.repository.AvisoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Aviso}.
 */
@Service
@Transactional
public class AvisoServiceImpl implements AvisoService {

    private final Logger log = LoggerFactory.getLogger(AvisoServiceImpl.class);

    private final AvisoRepository avisoRepository;

    public AvisoServiceImpl(AvisoRepository avisoRepository) {
        this.avisoRepository = avisoRepository;
    }

    @Override
    public Aviso save(Aviso aviso) {
        log.debug("Request to save Aviso : {}", aviso);
        return avisoRepository.save(aviso);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Aviso> findAll(Pageable pageable) {
        log.debug("Request to get all Avisos");
        return avisoRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Aviso> findOne(Long id) {
        log.debug("Request to get Aviso : {}", id);
        return avisoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Aviso : {}", id);
        avisoRepository.deleteById(id);
    }
}
