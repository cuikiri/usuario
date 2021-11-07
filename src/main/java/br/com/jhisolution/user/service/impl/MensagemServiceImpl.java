package br.com.jhisolution.user.service.impl;

import br.com.jhisolution.user.service.MensagemService;
import br.com.jhisolution.user.domain.Mensagem;
import br.com.jhisolution.user.repository.MensagemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Mensagem}.
 */
@Service
@Transactional
public class MensagemServiceImpl implements MensagemService {

    private final Logger log = LoggerFactory.getLogger(MensagemServiceImpl.class);

    private final MensagemRepository mensagemRepository;

    public MensagemServiceImpl(MensagemRepository mensagemRepository) {
        this.mensagemRepository = mensagemRepository;
    }

    @Override
    public Mensagem save(Mensagem mensagem) {
        log.debug("Request to save Mensagem : {}", mensagem);
        return mensagemRepository.save(mensagem);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Mensagem> findAll(Pageable pageable) {
        log.debug("Request to get all Mensagems");
        return mensagemRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Mensagem> findOne(Long id) {
        log.debug("Request to get Mensagem : {}", id);
        return mensagemRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Mensagem : {}", id);
        mensagemRepository.deleteById(id);
    }
}
