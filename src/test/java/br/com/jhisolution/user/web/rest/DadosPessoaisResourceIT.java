package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.UsersApp;
import br.com.jhisolution.user.domain.DadosPessoais;
import br.com.jhisolution.user.repository.DadosPessoaisRepository;
import br.com.jhisolution.user.service.DadosPessoaisService;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.jhisolution.user.domain.enumeration.EstadoCivil;
import br.com.jhisolution.user.domain.enumeration.Raca;
import br.com.jhisolution.user.domain.enumeration.Religiao;
/**
 * Integration tests for the {@link DadosPessoaisResource} REST controller.
 */
@SpringBootTest(classes = UsersApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DadosPessoaisResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_SOBRE_NOME = "AAAAAAAAAA";
    private static final String UPDATED_SOBRE_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_PAI = "AAAAAAAAAA";
    private static final String UPDATED_PAI = "BBBBBBBBBB";

    private static final String DEFAULT_MAE = "AAAAAAAAAA";
    private static final String UPDATED_MAE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    private static final String DEFAULT_WHATSAPP = "AAAAAAAAAA";
    private static final String UPDATED_WHATSAPP = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final EstadoCivil DEFAULT_ESTADO_CIVIL = EstadoCivil.SOLTEIRO;
    private static final EstadoCivil UPDATED_ESTADO_CIVIL = EstadoCivil.CASADO;

    private static final Raca DEFAULT_RACA = Raca.BRANCO;
    private static final Raca UPDATED_RACA = Raca.PARDA;

    private static final Religiao DEFAULT_RELIGIAO = Religiao.CATOLICO;
    private static final Religiao UPDATED_RELIGIAO = Religiao.PROTESTANTE;

    @Autowired
    private DadosPessoaisRepository dadosPessoaisRepository;

    @Autowired
    private DadosPessoaisService dadosPessoaisService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDadosPessoaisMockMvc;

    private DadosPessoais dadosPessoais;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DadosPessoais createEntity(EntityManager em) {
        DadosPessoais dadosPessoais = new DadosPessoais()
            .nome(DEFAULT_NOME)
            .sobreNome(DEFAULT_SOBRE_NOME)
            .pai(DEFAULT_PAI)
            .mae(DEFAULT_MAE)
            .telefone(DEFAULT_TELEFONE)
            .celular(DEFAULT_CELULAR)
            .whatsapp(DEFAULT_WHATSAPP)
            .email(DEFAULT_EMAIL)
            .estadoCivil(DEFAULT_ESTADO_CIVIL)
            .raca(DEFAULT_RACA)
            .religiao(DEFAULT_RELIGIAO);
        return dadosPessoais;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DadosPessoais createUpdatedEntity(EntityManager em) {
        DadosPessoais dadosPessoais = new DadosPessoais()
            .nome(UPDATED_NOME)
            .sobreNome(UPDATED_SOBRE_NOME)
            .pai(UPDATED_PAI)
            .mae(UPDATED_MAE)
            .telefone(UPDATED_TELEFONE)
            .celular(UPDATED_CELULAR)
            .whatsapp(UPDATED_WHATSAPP)
            .email(UPDATED_EMAIL)
            .estadoCivil(UPDATED_ESTADO_CIVIL)
            .raca(UPDATED_RACA)
            .religiao(UPDATED_RELIGIAO);
        return dadosPessoais;
    }

    @BeforeEach
    public void initTest() {
        dadosPessoais = createEntity(em);
    }

    @Test
    @Transactional
    public void createDadosPessoais() throws Exception {
        int databaseSizeBeforeCreate = dadosPessoaisRepository.findAll().size();
        // Create the DadosPessoais
        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isCreated());

        // Validate the DadosPessoais in the database
        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeCreate + 1);
        DadosPessoais testDadosPessoais = dadosPessoaisList.get(dadosPessoaisList.size() - 1);
        assertThat(testDadosPessoais.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDadosPessoais.getSobreNome()).isEqualTo(DEFAULT_SOBRE_NOME);
        assertThat(testDadosPessoais.getPai()).isEqualTo(DEFAULT_PAI);
        assertThat(testDadosPessoais.getMae()).isEqualTo(DEFAULT_MAE);
        assertThat(testDadosPessoais.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testDadosPessoais.getCelular()).isEqualTo(DEFAULT_CELULAR);
        assertThat(testDadosPessoais.getWhatsapp()).isEqualTo(DEFAULT_WHATSAPP);
        assertThat(testDadosPessoais.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testDadosPessoais.getEstadoCivil()).isEqualTo(DEFAULT_ESTADO_CIVIL);
        assertThat(testDadosPessoais.getRaca()).isEqualTo(DEFAULT_RACA);
        assertThat(testDadosPessoais.getReligiao()).isEqualTo(DEFAULT_RELIGIAO);
    }

    @Test
    @Transactional
    public void createDadosPessoaisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dadosPessoaisRepository.findAll().size();

        // Create the DadosPessoais with an existing ID
        dadosPessoais.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        // Validate the DadosPessoais in the database
        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dadosPessoaisRepository.findAll().size();
        // set the field null
        dadosPessoais.setNome(null);

        // Create the DadosPessoais, which fails.


        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSobreNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = dadosPessoaisRepository.findAll().size();
        // set the field null
        dadosPessoais.setSobreNome(null);

        // Create the DadosPessoais, which fails.


        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCelularIsRequired() throws Exception {
        int databaseSizeBeforeTest = dadosPessoaisRepository.findAll().size();
        // set the field null
        dadosPessoais.setCelular(null);

        // Create the DadosPessoais, which fails.


        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = dadosPessoaisRepository.findAll().size();
        // set the field null
        dadosPessoais.setEmail(null);

        // Create the DadosPessoais, which fails.


        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEstadoCivilIsRequired() throws Exception {
        int databaseSizeBeforeTest = dadosPessoaisRepository.findAll().size();
        // set the field null
        dadosPessoais.setEstadoCivil(null);

        // Create the DadosPessoais, which fails.


        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRacaIsRequired() throws Exception {
        int databaseSizeBeforeTest = dadosPessoaisRepository.findAll().size();
        // set the field null
        dadosPessoais.setRaca(null);

        // Create the DadosPessoais, which fails.


        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReligiaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = dadosPessoaisRepository.findAll().size();
        // set the field null
        dadosPessoais.setReligiao(null);

        // Create the DadosPessoais, which fails.


        restDadosPessoaisMockMvc.perform(post("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDadosPessoais() throws Exception {
        // Initialize the database
        dadosPessoaisRepository.saveAndFlush(dadosPessoais);

        // Get all the dadosPessoaisList
        restDadosPessoaisMockMvc.perform(get("/api/dados-pessoais?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dadosPessoais.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].sobreNome").value(hasItem(DEFAULT_SOBRE_NOME)))
            .andExpect(jsonPath("$.[*].pai").value(hasItem(DEFAULT_PAI)))
            .andExpect(jsonPath("$.[*].mae").value(hasItem(DEFAULT_MAE)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR)))
            .andExpect(jsonPath("$.[*].whatsapp").value(hasItem(DEFAULT_WHATSAPP)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].estadoCivil").value(hasItem(DEFAULT_ESTADO_CIVIL.toString())))
            .andExpect(jsonPath("$.[*].raca").value(hasItem(DEFAULT_RACA.toString())))
            .andExpect(jsonPath("$.[*].religiao").value(hasItem(DEFAULT_RELIGIAO.toString())));
    }
    
    @Test
    @Transactional
    public void getDadosPessoais() throws Exception {
        // Initialize the database
        dadosPessoaisRepository.saveAndFlush(dadosPessoais);

        // Get the dadosPessoais
        restDadosPessoaisMockMvc.perform(get("/api/dados-pessoais/{id}", dadosPessoais.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dadosPessoais.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.sobreNome").value(DEFAULT_SOBRE_NOME))
            .andExpect(jsonPath("$.pai").value(DEFAULT_PAI))
            .andExpect(jsonPath("$.mae").value(DEFAULT_MAE))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR))
            .andExpect(jsonPath("$.whatsapp").value(DEFAULT_WHATSAPP))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.estadoCivil").value(DEFAULT_ESTADO_CIVIL.toString()))
            .andExpect(jsonPath("$.raca").value(DEFAULT_RACA.toString()))
            .andExpect(jsonPath("$.religiao").value(DEFAULT_RELIGIAO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDadosPessoais() throws Exception {
        // Get the dadosPessoais
        restDadosPessoaisMockMvc.perform(get("/api/dados-pessoais/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDadosPessoais() throws Exception {
        // Initialize the database
        dadosPessoaisService.save(dadosPessoais);

        int databaseSizeBeforeUpdate = dadosPessoaisRepository.findAll().size();

        // Update the dadosPessoais
        DadosPessoais updatedDadosPessoais = dadosPessoaisRepository.findById(dadosPessoais.getId()).get();
        // Disconnect from session so that the updates on updatedDadosPessoais are not directly saved in db
        em.detach(updatedDadosPessoais);
        updatedDadosPessoais
            .nome(UPDATED_NOME)
            .sobreNome(UPDATED_SOBRE_NOME)
            .pai(UPDATED_PAI)
            .mae(UPDATED_MAE)
            .telefone(UPDATED_TELEFONE)
            .celular(UPDATED_CELULAR)
            .whatsapp(UPDATED_WHATSAPP)
            .email(UPDATED_EMAIL)
            .estadoCivil(UPDATED_ESTADO_CIVIL)
            .raca(UPDATED_RACA)
            .religiao(UPDATED_RELIGIAO);

        restDadosPessoaisMockMvc.perform(put("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDadosPessoais)))
            .andExpect(status().isOk());

        // Validate the DadosPessoais in the database
        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeUpdate);
        DadosPessoais testDadosPessoais = dadosPessoaisList.get(dadosPessoaisList.size() - 1);
        assertThat(testDadosPessoais.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDadosPessoais.getSobreNome()).isEqualTo(UPDATED_SOBRE_NOME);
        assertThat(testDadosPessoais.getPai()).isEqualTo(UPDATED_PAI);
        assertThat(testDadosPessoais.getMae()).isEqualTo(UPDATED_MAE);
        assertThat(testDadosPessoais.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testDadosPessoais.getCelular()).isEqualTo(UPDATED_CELULAR);
        assertThat(testDadosPessoais.getWhatsapp()).isEqualTo(UPDATED_WHATSAPP);
        assertThat(testDadosPessoais.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testDadosPessoais.getEstadoCivil()).isEqualTo(UPDATED_ESTADO_CIVIL);
        assertThat(testDadosPessoais.getRaca()).isEqualTo(UPDATED_RACA);
        assertThat(testDadosPessoais.getReligiao()).isEqualTo(UPDATED_RELIGIAO);
    }

    @Test
    @Transactional
    public void updateNonExistingDadosPessoais() throws Exception {
        int databaseSizeBeforeUpdate = dadosPessoaisRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDadosPessoaisMockMvc.perform(put("/api/dados-pessoais")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(dadosPessoais)))
            .andExpect(status().isBadRequest());

        // Validate the DadosPessoais in the database
        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDadosPessoais() throws Exception {
        // Initialize the database
        dadosPessoaisService.save(dadosPessoais);

        int databaseSizeBeforeDelete = dadosPessoaisRepository.findAll().size();

        // Delete the dadosPessoais
        restDadosPessoaisMockMvc.perform(delete("/api/dados-pessoais/{id}", dadosPessoais.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DadosPessoais> dadosPessoaisList = dadosPessoaisRepository.findAll();
        assertThat(dadosPessoaisList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
