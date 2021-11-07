package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.UsersApp;
import br.com.jhisolution.user.domain.Mensagem;
import br.com.jhisolution.user.repository.MensagemRepository;
import br.com.jhisolution.user.service.MensagemService;

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

import br.com.jhisolution.user.domain.enumeration.TipoMensagem;
/**
 * Integration tests for the {@link MensagemResource} REST controller.
 */
@SpringBootTest(classes = UsersApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MensagemResourceIT {

    private static final ZonedDateTime DEFAULT_DATA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LEITURA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LEITURA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTEUDO = "AAAAAAAAAA";
    private static final String UPDATED_CONTEUDO = "BBBBBBBBBB";

    private static final TipoMensagem DEFAULT_TIPO = TipoMensagem.INFORMACAO;
    private static final TipoMensagem UPDATED_TIPO = TipoMensagem.COMUNICADO;

    @Autowired
    private MensagemRepository mensagemRepository;

    @Autowired
    private MensagemService mensagemService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMensagemMockMvc;

    private Mensagem mensagem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mensagem createEntity(EntityManager em) {
        Mensagem mensagem = new Mensagem()
            .data(DEFAULT_DATA)
            .leitura(DEFAULT_LEITURA)
            .titulo(DEFAULT_TITULO)
            .conteudo(DEFAULT_CONTEUDO)
            .tipo(DEFAULT_TIPO);
        return mensagem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mensagem createUpdatedEntity(EntityManager em) {
        Mensagem mensagem = new Mensagem()
            .data(UPDATED_DATA)
            .leitura(UPDATED_LEITURA)
            .titulo(UPDATED_TITULO)
            .conteudo(UPDATED_CONTEUDO)
            .tipo(UPDATED_TIPO);
        return mensagem;
    }

    @BeforeEach
    public void initTest() {
        mensagem = createEntity(em);
    }

    @Test
    @Transactional
    public void createMensagem() throws Exception {
        int databaseSizeBeforeCreate = mensagemRepository.findAll().size();
        // Create the Mensagem
        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isCreated());

        // Validate the Mensagem in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeCreate + 1);
        Mensagem testMensagem = mensagemList.get(mensagemList.size() - 1);
        assertThat(testMensagem.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testMensagem.getLeitura()).isEqualTo(DEFAULT_LEITURA);
        assertThat(testMensagem.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testMensagem.getConteudo()).isEqualTo(DEFAULT_CONTEUDO);
        assertThat(testMensagem.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createMensagemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mensagemRepository.findAll().size();

        // Create the Mensagem with an existing ID
        mensagem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isBadRequest());

        // Validate the Mensagem in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDataIsRequired() throws Exception {
        int databaseSizeBeforeTest = mensagemRepository.findAll().size();
        // set the field null
        mensagem.setData(null);

        // Create the Mensagem, which fails.


        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isBadRequest());

        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTituloIsRequired() throws Exception {
        int databaseSizeBeforeTest = mensagemRepository.findAll().size();
        // set the field null
        mensagem.setTitulo(null);

        // Create the Mensagem, which fails.


        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isBadRequest());

        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkConteudoIsRequired() throws Exception {
        int databaseSizeBeforeTest = mensagemRepository.findAll().size();
        // set the field null
        mensagem.setConteudo(null);

        // Create the Mensagem, which fails.


        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isBadRequest());

        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = mensagemRepository.findAll().size();
        // set the field null
        mensagem.setTipo(null);

        // Create the Mensagem, which fails.


        restMensagemMockMvc.perform(post("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isBadRequest());

        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMensagems() throws Exception {
        // Initialize the database
        mensagemRepository.saveAndFlush(mensagem);

        // Get all the mensagemList
        restMensagemMockMvc.perform(get("/api/mensagems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mensagem.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(sameInstant(DEFAULT_DATA))))
            .andExpect(jsonPath("$.[*].leitura").value(hasItem(sameInstant(DEFAULT_LEITURA))))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO)))
            .andExpect(jsonPath("$.[*].conteudo").value(hasItem(DEFAULT_CONTEUDO)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }
    
    @Test
    @Transactional
    public void getMensagem() throws Exception {
        // Initialize the database
        mensagemRepository.saveAndFlush(mensagem);

        // Get the mensagem
        restMensagemMockMvc.perform(get("/api/mensagems/{id}", mensagem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(mensagem.getId().intValue()))
            .andExpect(jsonPath("$.data").value(sameInstant(DEFAULT_DATA)))
            .andExpect(jsonPath("$.leitura").value(sameInstant(DEFAULT_LEITURA)))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO))
            .andExpect(jsonPath("$.conteudo").value(DEFAULT_CONTEUDO))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMensagem() throws Exception {
        // Get the mensagem
        restMensagemMockMvc.perform(get("/api/mensagems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMensagem() throws Exception {
        // Initialize the database
        mensagemService.save(mensagem);

        int databaseSizeBeforeUpdate = mensagemRepository.findAll().size();

        // Update the mensagem
        Mensagem updatedMensagem = mensagemRepository.findById(mensagem.getId()).get();
        // Disconnect from session so that the updates on updatedMensagem are not directly saved in db
        em.detach(updatedMensagem);
        updatedMensagem
            .data(UPDATED_DATA)
            .leitura(UPDATED_LEITURA)
            .titulo(UPDATED_TITULO)
            .conteudo(UPDATED_CONTEUDO)
            .tipo(UPDATED_TIPO);

        restMensagemMockMvc.perform(put("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMensagem)))
            .andExpect(status().isOk());

        // Validate the Mensagem in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeUpdate);
        Mensagem testMensagem = mensagemList.get(mensagemList.size() - 1);
        assertThat(testMensagem.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testMensagem.getLeitura()).isEqualTo(UPDATED_LEITURA);
        assertThat(testMensagem.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testMensagem.getConteudo()).isEqualTo(UPDATED_CONTEUDO);
        assertThat(testMensagem.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingMensagem() throws Exception {
        int databaseSizeBeforeUpdate = mensagemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMensagemMockMvc.perform(put("/api/mensagems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(mensagem)))
            .andExpect(status().isBadRequest());

        // Validate the Mensagem in the database
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMensagem() throws Exception {
        // Initialize the database
        mensagemService.save(mensagem);

        int databaseSizeBeforeDelete = mensagemRepository.findAll().size();

        // Delete the mensagem
        restMensagemMockMvc.perform(delete("/api/mensagems/{id}", mensagem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mensagem> mensagemList = mensagemRepository.findAll();
        assertThat(mensagemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
