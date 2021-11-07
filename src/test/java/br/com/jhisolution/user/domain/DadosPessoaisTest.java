package br.com.jhisolution.user.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.jhisolution.user.web.rest.TestUtil;

public class DadosPessoaisTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DadosPessoais.class);
        DadosPessoais dadosPessoais1 = new DadosPessoais();
        dadosPessoais1.setId(1L);
        DadosPessoais dadosPessoais2 = new DadosPessoais();
        dadosPessoais2.setId(dadosPessoais1.getId());
        assertThat(dadosPessoais1).isEqualTo(dadosPessoais2);
        dadosPessoais2.setId(2L);
        assertThat(dadosPessoais1).isNotEqualTo(dadosPessoais2);
        dadosPessoais1.setId(null);
        assertThat(dadosPessoais1).isNotEqualTo(dadosPessoais2);
    }
}
