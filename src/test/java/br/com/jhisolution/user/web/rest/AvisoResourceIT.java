package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.UsersApp;
import br.com.jhisolution.user.domain.Aviso;
import br.com.jhisolution.user.repository.AvisoRepository;
import br.com.jhisolution.user.service.AvisoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static br.com.jhisolution.user.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.domain.enumeration.TipoAviso;
/**
 * Integration tests for the {@link AvisoResource} REST controller.
 */
@SpringBootTest(classes = UsersApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AvisoResourceIT {

    private static final ZonedDateTime DEFAULT_DATA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LEITURA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LEITURA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTEUDO = "AAAAAAAAAA";
    private static final String UPDATED_CONTEUDO = "BBBBBBBBBB";

    private static final TipoAviso DEFAULT_TIPO = TipoAviso.SOLICITACAO;
    private static final TipoAviso UPDATED_TIPO = TipoAviso.ADVERTENCIA;

    @Autowired
    private AvisoRepository avisoRepository;

    @Autowired
    private AvisoService avisoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAvisoMockMvc;

    private Aviso aviso;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aviso createEntity(EntityManager em) {
        Aviso aviso = new Aviso()
            .data(DEFAULT_DATA)
            .leitura(DEFAULT_LEITURA)
            .titulo(DEFAULT_TITULO)
            .conteudo(DEFAULT_CONTEUDO)
            .tipo(DEFAULT_TIPO);
        return aviso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aviso createUpdatedEntity(EntityManager em) {
        Aviso aviso = new Aviso()
            .data(UPDATED_DATA)
            .leitura(UPDATED_LEITURA)
            .titulo(UPDATED_TITULO)
            .conteudo(UPDATED_CONTEUDO)
            .tipo(UPDATED_TIPO);
        return aviso;
    }

    @BeforeEach
    public void initTest() {
        aviso = createEntity(em);
    }

    @Test
    @Transactional
    public void createAviso() throws Exception {
        int databaseSizeBeforeCreate = avisoRepository.findAll().size();
        // Create the Aviso
        restAvisoMockMvc.perform(post("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aviso)))
            .andExpect(status().isCreated());

        // Validate the Aviso in the database
        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeCreate + 1);
        Aviso testAviso = avisoList.get(avisoList.size() - 1);
        assertThat(testAviso.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testAviso.getLeitura()).isEqualTo(DEFAULT_LEITURA);
        assertThat(testAviso.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testAviso.getConteudo()).isEqualTo(DEFAULT_CONTEUDO);
        assertThat(testAviso.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createAvisoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avisoRepository.findAll().size();

        // Create the Aviso with an existing ID
        aviso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvisoMockMvc.perform(post("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aviso)))
            .andExpect(status().isBadRequest());

        // Validate the Aviso in the database
        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDataIsRequired() throws Exception {
        int databaseSizeBeforeTest = avisoRepository.findAll().size();
        // set the field null
        aviso.setData(null);

        // Create the Aviso, which fails.


        restAvisoMockMvc.perform(post("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aviso)))
            .andExpect(status().isBadRequest());

        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTituloIsRequired() throws Exception {
        int databaseSizeBeforeTest = avisoRepository.findAll().size();
        // set the field null
        aviso.setTitulo(null);

        // Create the Aviso, which fails.


        restAvisoMockMvc.perform(post("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aviso)))
            .andExpect(status().isBadRequest());

        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkConteudoIsRequired() throws Exception {
        int databaseSizeBeforeTest = avisoRepository.findAll().size();
        // set the field null
        aviso.setConteudo(null);

        // Create the Aviso, which fails.


        restAvisoMockMvc.perform(post("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aviso)))
            .andExpect(status().isBadRequest());

        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = avisoRepository.findAll().size();
        // set the field null
        aviso.setTipo(null);

        // Create the Aviso, which fails.


        restAvisoMockMvc.perform(post("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aviso)))
            .andExpect(status().isBadRequest());

        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAvisos() throws Exception {
        // Initialize the database
        avisoRepository.saveAndFlush(aviso);

        // Get all the avisoList
        restAvisoMockMvc.perform(get("/api/avisos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aviso.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(sameInstant(DEFAULT_DATA))))
            .andExpect(jsonPath("$.[*].leitura").value(hasItem(sameInstant(DEFAULT_LEITURA))))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO)))
            .andExpect(jsonPath("$.[*].conteudo").value(hasItem(DEFAULT_CONTEUDO)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }
    
    @Test
    @Transactional
    public void getAviso() throws Exception {
        // Initialize the database
        avisoRepository.saveAndFlush(aviso);

        // Get the aviso
        restAvisoMockMvc.perform(get("/api/avisos/{id}", aviso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aviso.getId().intValue()))
            .andExpect(jsonPath("$.data").value(sameInstant(DEFAULT_DATA)))
            .andExpect(jsonPath("$.leitura").value(sameInstant(DEFAULT_LEITURA)))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO))
            .andExpect(jsonPath("$.conteudo").value(DEFAULT_CONTEUDO))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAviso() throws Exception {
        // Get the aviso
        restAvisoMockMvc.perform(get("/api/avisos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAviso() throws Exception {
        // Initialize the database
        avisoService.save(aviso);

        int databaseSizeBeforeUpdate = avisoRepository.findAll().size();

        // Update the aviso
        Aviso updatedAviso = avisoRepository.findById(aviso.getId()).get();
        // Disconnect from session so that the updates on updatedAviso are not directly saved in db
        em.detach(updatedAviso);
        updatedAviso
            .data(UPDATED_DATA)
            .leitura(UPDATED_LEITURA)
            .titulo(UPDATED_TITULO)
            .conteudo(UPDATED_CONTEUDO)
            .tipo(UPDATED_TIPO);

        restAvisoMockMvc.perform(put("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAviso)))
            .andExpect(status().isOk());

        // Validate the Aviso in the database
        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeUpdate);
        Aviso testAviso = avisoList.get(avisoList.size() - 1);
        assertThat(testAviso.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testAviso.getLeitura()).isEqualTo(UPDATED_LEITURA);
        assertThat(testAviso.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testAviso.getConteudo()).isEqualTo(UPDATED_CONTEUDO);
        assertThat(testAviso.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingAviso() throws Exception {
        int databaseSizeBeforeUpdate = avisoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvisoMockMvc.perform(put("/api/avisos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aviso)))
            .andExpect(status().isBadRequest());

        // Validate the Aviso in the database
        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAviso() throws Exception {
        // Initialize the database
        avisoService.save(aviso);

        int databaseSizeBeforeDelete = avisoRepository.findAll().size();

        // Delete the aviso
        restAvisoMockMvc.perform(delete("/api/avisos/{id}", aviso.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aviso> avisoList = avisoRepository.findAll();
        assertThat(avisoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
