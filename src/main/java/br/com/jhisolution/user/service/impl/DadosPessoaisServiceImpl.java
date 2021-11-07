package br.com.jhisolution.user.service.impl;

import br.com.jhisolution.user.service.DadosPessoaisService;
import br.com.jhisolution.user.domain.DadosPessoais;
import br.com.jhisolution.user.repository.DadosPessoaisRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link DadosPessoais}.
 */
@Service
@Transactional
public class DadosPessoaisServiceImpl implements DadosPessoaisService {

    private final Logger log = LoggerFactory.getLogger(DadosPessoaisServiceImpl.class);

    private final DadosPessoaisRepository dadosPessoaisRepository;

    public DadosPessoaisServiceImpl(DadosPessoaisRepository dadosPessoaisRepository) {
        this.dadosPessoaisRepository = dadosPessoaisRepository;
    }

    @Override
    public DadosPessoais save(DadosPessoais dadosPessoais) {
        log.debug("Request to save DadosPessoais : {}", dadosPessoais);
        return dadosPessoaisRepository.save(dadosPessoais);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DadosPessoais> findAll(Pageable pageable) {
        log.debug("Request to get all DadosPessoais");
        return dadosPessoaisRepository.findAll(pageable);
    }



    /**
     *  Get all the dadosPessoais where User is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<DadosPessoais> findAllWhereUserIsNull() {
        log.debug("Request to get all dadosPessoais where User is null");
        return StreamSupport
            .stream(dadosPessoaisRepository.findAll().spliterator(), false)
            .filter(dadosPessoais -> dadosPessoais.getUser() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DadosPessoais> findOne(Long id) {
        log.debug("Request to get DadosPessoais : {}", id);
        return dadosPessoaisRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete DadosPessoais : {}", id);
        dadosPessoaisRepository.deleteById(id);
    }
}
