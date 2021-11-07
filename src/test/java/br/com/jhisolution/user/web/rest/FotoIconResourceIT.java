package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.UsersApp;
import br.com.jhisolution.user.domain.FotoIcon;
import br.com.jhisolution.user.repository.FotoIconRepository;
import br.com.jhisolution.user.service.FotoIconService;

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
 * Integration tests for the {@link FotoIconResource} REST controller.
 */
@SpringBootTest(classes = UsersApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FotoIconResourceIT {

    private static final byte[] DEFAULT_CONTEUDO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_CONTEUDO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_CONTEUDO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_CONTEUDO_CONTENT_TYPE = "image/png";

    @Autowired
    private FotoIconRepository fotoIconRepository;

    @Autowired
    private FotoIconService fotoIconService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFotoIconMockMvc;

    private FotoIcon fotoIcon;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FotoIcon createEntity(EntityManager em) {
        FotoIcon fotoIcon = new FotoIcon()
            .conteudo(DEFAULT_CONTEUDO)
            .conteudoContentType(DEFAULT_CONTEUDO_CONTENT_TYPE);
        return fotoIcon;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FotoIcon createUpdatedEntity(EntityManager em) {
        FotoIcon fotoIcon = new FotoIcon()
            .conteudo(UPDATED_CONTEUDO)
            .conteudoContentType(UPDATED_CONTEUDO_CONTENT_TYPE);
        return fotoIcon;
    }

    @BeforeEach
    public void initTest() {
        fotoIcon = createEntity(em);
    }

    @Test
    @Transactional
    public void createFotoIcon() throws Exception {
        int databaseSizeBeforeCreate = fotoIconRepository.findAll().size();
        // Create the FotoIcon
        restFotoIconMockMvc.perform(post("/api/foto-icons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fotoIcon)))
            .andExpect(status().isCreated());

        // Validate the FotoIcon in the database
        List<FotoIcon> fotoIconList = fotoIconRepository.findAll();
        assertThat(fotoIconList).hasSize(databaseSizeBeforeCreate + 1);
        FotoIcon testFotoIcon = fotoIconList.get(fotoIconList.size() - 1);
        assertThat(testFotoIcon.getConteudo()).isEqualTo(DEFAULT_CONTEUDO);
        assertThat(testFotoIcon.getConteudoContentType()).isEqualTo(DEFAULT_CONTEUDO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createFotoIconWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fotoIconRepository.findAll().size();

        // Create the FotoIcon with an existing ID
        fotoIcon.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFotoIconMockMvc.perform(post("/api/foto-icons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fotoIcon)))
            .andExpect(status().isBadRequest());

        // Validate the FotoIcon in the database
        List<FotoIcon> fotoIconList = fotoIconRepository.findAll();
        assertThat(fotoIconList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFotoIcons() throws Exception {
        // Initialize the database
        fotoIconRepository.saveAndFlush(fotoIcon);

        // Get all the fotoIconList
        restFotoIconMockMvc.perform(get("/api/foto-icons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fotoIcon.getId().intValue())))
            .andExpect(jsonPath("$.[*].conteudoContentType").value(hasItem(DEFAULT_CONTEUDO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].conteudo").value(hasItem(Base64Utils.encodeToString(DEFAULT_CONTEUDO))));
    }
    
    @Test
    @Transactional
    public void getFotoIcon() throws Exception {
        // Initialize the database
        fotoIconRepository.saveAndFlush(fotoIcon);

        // Get the fotoIcon
        restFotoIconMockMvc.perform(get("/api/foto-icons/{id}", fotoIcon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fotoIcon.getId().intValue()))
            .andExpect(jsonPath("$.conteudoContentType").value(DEFAULT_CONTEUDO_CONTENT_TYPE))
            .andExpect(jsonPath("$.conteudo").value(Base64Utils.encodeToString(DEFAULT_CONTEUDO)));
    }
    @Test
    @Transactional
    public void getNonExistingFotoIcon() throws Exception {
        // Get the fotoIcon
        restFotoIconMockMvc.perform(get("/api/foto-icons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFotoIcon() throws Exception {
        // Initialize the database
        fotoIconService.save(fotoIcon);

        int databaseSizeBeforeUpdate = fotoIconRepository.findAll().size();

        // Update the fotoIcon
        FotoIcon updatedFotoIcon = fotoIconRepository.findById(fotoIcon.getId()).get();
        // Disconnect from session so that the updates on updatedFotoIcon are not directly saved in db
        em.detach(updatedFotoIcon);
        updatedFotoIcon
            .conteudo(UPDATED_CONTEUDO)
            .conteudoContentType(UPDATED_CONTEUDO_CONTENT_TYPE);

        restFotoIconMockMvc.perform(put("/api/foto-icons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFotoIcon)))
            .andExpect(status().isOk());

        // Validate the FotoIcon in the database
        List<FotoIcon> fotoIconList = fotoIconRepository.findAll();
        assertThat(fotoIconList).hasSize(databaseSizeBeforeUpdate);
        FotoIcon testFotoIcon = fotoIconList.get(fotoIconList.size() - 1);
        assertThat(testFotoIcon.getConteudo()).isEqualTo(UPDATED_CONTEUDO);
        assertThat(testFotoIcon.getConteudoContentType()).isEqualTo(UPDATED_CONTEUDO_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFotoIcon() throws Exception {
        int databaseSizeBeforeUpdate = fotoIconRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFotoIconMockMvc.perform(put("/api/foto-icons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fotoIcon)))
            .andExpect(status().isBadRequest());

        // Validate the FotoIcon in the database
        List<FotoIcon> fotoIconList = fotoIconRepository.findAll();
        assertThat(fotoIconList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFotoIcon() throws Exception {
        // Initialize the database
        fotoIconService.save(fotoIcon);

        int databaseSizeBeforeDelete = fotoIconRepository.findAll().size();

        // Delete the fotoIcon
        restFotoIconMockMvc.perform(delete("/api/foto-icons/{id}", fotoIcon.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FotoIcon> fotoIconList = fotoIconRepository.findAll();
        assertThat(fotoIconList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
