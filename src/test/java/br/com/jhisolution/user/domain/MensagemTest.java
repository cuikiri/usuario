package br.com.jhisolution.user.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.jhisolution.user.web.rest.TestUtil;

public class MensagemTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mensagem.class);
        Mensagem mensagem1 = new Mensagem();
        mensagem1.setId(1L);
        Mensagem mensagem2 = new Mensagem();
        mensagem2.setId(mensagem1.getId());
        assertThat(mensagem1).isEqualTo(mensagem2);
        mensagem2.setId(2L);
        assertThat(mensagem1).isNotEqualTo(mensagem2);
        mensagem1.setId(null);
        assertThat(mensagem1).isNotEqualTo(mensagem2);
    }
}
