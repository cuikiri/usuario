package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.UsersApp;
import br.com.jhisolution.user.domain.FotoDocumento;
import br.com.jhisolution.user.repository.FotoDocumentoRepository;
import br.com.jhisolution.user.service.FotoDocumentoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FotoDocumentoResource} REST controller.
 */
@SpringBootTest(classes = UsersApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FotoDocumentoResourceIT {

    private static final byte[] DEFAULT_CONTEUDO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONTEUDO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CONTEUDO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONTEUDO_CONTENT_TYPE = "image/png";

    @Autowired
    private FotoDocumentoRepository fotoDocumentoRepository;

    @Autowired
    private FotoDocumentoService fotoDocumentoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFotoDocumentoMockMvc;

    private FotoDocumento fotoDocumento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FotoDocumento createEntity(EntityManager em) {
        FotoDocumento fotoDocumento = new FotoDocumento()
            .conteudo(DEFAULT_CONTEUDO)
            .conteudoContentType(DEFAULT_CONTEUDO_CONTENT_TYPE);
        return fotoDocumento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FotoDocumento createUpdatedEntity(EntityManager em) {
        FotoDocumento fotoDocumento = new FotoDocumento()
            .conteudo(UPDATED_CONTEUDO)
            .conteudoContentType(UPDATED_CONTEUDO_CONTENT_TYPE);
        return fotoDocumento;
    }

    @BeforeEach
    public void initTest() {
        fotoDocumento = createEntity(em);
    }

    @Test
    @Transactional
    public void createFotoDocumento() throws Exception {
        int databaseSizeBeforeCreate = fotoDocumentoRepository.findAll().size();
        // Create the FotoDocumento
        restFotoDocumentoMockMvc.perform(post("/api/foto-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fotoDocumento)))
            .andExpect(status().isCreated());

        // Validate the FotoDocumento in the database
        List<FotoDocumento> fotoDocumentoList = fotoDocumentoRepository.findAll();
        assertThat(fotoDocumentoList).hasSize(databaseSizeBeforeCreate + 1);
        FotoDocumento testFotoDocumento = fotoDocumentoList.get(fotoDocumentoList.size() - 1);
        assertThat(testFotoDocumento.getConteudo()).isEqualTo(DEFAULT_CONTEUDO);
        assertThat(testFotoDocumento.getConteudoContentType()).isEqualTo(DEFAULT_CONTEUDO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFotoDocumentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fotoDocumentoRepository.findAll().size();

        // Create the FotoDocumento with an existing ID
        fotoDocumento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFotoDocumentoMockMvc.perform(post("/api/foto-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fotoDocumento)))
            .andExpect(status().isBadRequest());

        // Validate the FotoDocumento in the database
        List<FotoDocumento> fotoDocumentoList = fotoDocumentoRepository.findAll();
        assertThat(fotoDocumentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFotoDocumentos() throws Exception {
        // Initialize the database
        fotoDocumentoRepository.saveAndFlush(fotoDocumento);

        // Get all the fotoDocumentoList
        restFotoDocumentoMockMvc.perform(get("/api/foto-documentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fotoDocumento.getId().intValue())))
            .andExpect(jsonPath("$.[*].conteudoContentType").value(hasItem(DEFAULT_CONTEUDO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].conteudo").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTEUDO))));
    }
    
    @Test
    @Transactional
    public void getFotoDocumento() throws Exception {
        // Initialize the database
        fotoDocumentoRepository.saveAndFlush(fotoDocumento);

        // Get the fotoDocumento
        restFotoDocumentoMockMvc.perform(get("/api/foto-documentos/{id}", fotoDocumento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fotoDocumento.getId().intValue()))
            .andExpect(jsonPath("$.conteudoContentType").value(DEFAULT_CONTEUDO_CONTENT_TYPE))
            .andExpect(jsonPath("$.conteudo").value(Base64Utils.encodeToString(DEFAULT_CONTEUDO)));
    }
    @Test
    @Transactional
    public void getNonExistingFotoDocumento() throws Exception {
        // Get the fotoDocumento
        restFotoDocumentoMockMvc.perform(get("/api/foto-documentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFotoDocumento() throws Exception {
        // Initialize the database
        fotoDocumentoService.save(fotoDocumento);

        int databaseSizeBeforeUpdate = fotoDocumentoRepository.findAll().size();

        // Update the fotoDocumento
        FotoDocumento updatedFotoDocumento = fotoDocumentoRepository.findById(fotoDocumento.getId()).get();
        // Disconnect from session so that the updates on updatedFotoDocumento are not directly saved in db
        em.detach(updatedFotoDocumento);
        updatedFotoDocumento
            .conteudo(UPDATED_CONTEUDO)
            .conteudoContentType(UPDATED_CONTEUDO_CONTENT_TYPE);

        restFotoDocumentoMockMvc.perform(put("/api/foto-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFotoDocumento)))
            .andExpect(status().isOk());

        // Validate the FotoDocumento in the database
        List<FotoDocumento> fotoDocumentoList = fotoDocumentoRepository.findAll();
        assertThat(fotoDocumentoList).hasSize(databaseSizeBeforeUpdate);
        FotoDocumento testFotoDocumento = fotoDocumentoList.get(fotoDocumentoList.size() - 1);
        assertThat(testFotoDocumento.getConteudo()).isEqualTo(UPDATED_CONTEUDO);
        assertThat(testFotoDocumento.getConteudoContentType()).isEqualTo(UPDATED_CONTEUDO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFotoDocumento() throws Exception {
        int databaseSizeBeforeUpdate = fotoDocumentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFotoDocumentoMockMvc.perform(put("/api/foto-documentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fotoDocumento)))
            .andExpect(status().isBadRequest());

        // Validate the FotoDocumento in the database
        List<FotoDocumento> fotoDocumentoList = fotoDocumentoRepository.findAll();
        assertThat(fotoDocumentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFotoDocumento() throws Exception {
        // Initialize the database
        fotoDocumentoService.save(fotoDocumento);

        int databaseSizeBeforeDelete = fotoDocumentoRepository.findAll().size();

        // Delete the fotoDocumento
        restFotoDocumentoMockMvc.perform(delete("/api/foto-documentos/{id}", fotoDocumento.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FotoDocumento> fotoDocumentoList = fotoDocumentoRepository.findAll();
        assertThat(fotoDocumentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
