package br.com.jhisolution.user.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.jhisolution.user.web.rest.TestUtil;

public class User1Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(User1.class);
        User1 user11 = new User1();
        user11.setId(1L);
        User1 user12 = new User1();
        user12.setId(user11.getId());
        assertThat(user11).isEqualTo(user12);
        user12.setId(2L);
        assertThat(user11).isNotEqualTo(user12);
        user11.setId(null);
        assertThat(user11).isNotEqualTo(user12);
    }
}
