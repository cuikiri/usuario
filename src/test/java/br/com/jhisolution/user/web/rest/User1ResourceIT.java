package br.com.jhisolution.user.web.rest;

import br.com.jhisolution.user.UsersApp;
import br.com.jhisolution.user.domain.User1;
import br.com.jhisolution.user.repository.User1Repository;
import br.com.jhisolution.user.service.User1Service;

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

/**
 * Integration tests for the {@link User1Resource} REST controller.
 */
@SpringBootTest(classes = UsersApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class User1ResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private User1Repository user1Repository;

    @Autowired
    private User1Service user1Service;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUser1MockMvc;

    private User1 user1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createEntity(EntityManager em) {
        User1 user1 = new User1()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL);
        return user1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createUpdatedEntity(EntityManager em) {
        User1 user1 = new User1()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL);
        return user1;
    }

    @BeforeEach
    public void initTest() {
        user1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createUser1() throws Exception {
        int databaseSizeBeforeCreate = user1Repository.findAll().size();
        // Create the User1
        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isCreated());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate + 1);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testUser1.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testUser1.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void createUser1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = user1Repository.findAll().size();

        // Create the User1 with an existing ID
        user1.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = user1Repository.findAll().size();
        // set the field null
        user1.setFirstName(null);

        // Create the User1, which fails.


        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isBadRequest());

        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = user1Repository.findAll().size();
        // set the field null
        user1.setLastName(null);

        // Create the User1, which fails.


        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isBadRequest());

        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = user1Repository.findAll().size();
        // set the field null
        user1.setEmail(null);

        // Create the User1, which fails.


        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isBadRequest());

        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUser1s() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get all the user1List
        restUser1MockMvc.perform(get("/api/user-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(user1.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)));
    }
    
    @Test
    @Transactional
    public void getUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get the user1
        restUser1MockMvc.perform(get("/api/user-1-s/{id}", user1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(user1.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL));
    }
    @Test
    @Transactional
    public void getNonExistingUser1() throws Exception {
        // Get the user1
        restUser1MockMvc.perform(get("/api/user-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUser1() throws Exception {
        // Initialize the database
        user1Service.save(user1);

        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Update the user1
        User1 updatedUser1 = user1Repository.findById(user1.getId()).get();
        // Disconnect from session so that the updates on updatedUser1 are not directly saved in db
        em.detach(updatedUser1);
        updatedUser1
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL);

        restUser1MockMvc.perform(put("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUser1)))
            .andExpect(status().isOk());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testUser1.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testUser1.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUser1MockMvc.perform(put("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1)))
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUser1() throws Exception {
        // Initialize the database
        user1Service.save(user1);

        int databaseSizeBeforeDelete = user1Repository.findAll().size();

        // Delete the user1
        restUser1MockMvc.perform(delete("/api/user-1-s/{id}", user1.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
