package br.com.jhisolution.user.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.jhisolution.user.web.rest.TestUtil;

public class FotoDocumentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FotoDocumento.class);
        FotoDocumento fotoDocumento1 = new FotoDocumento();
        fotoDocumento1.setId(1L);
        FotoDocumento fotoDocumento2 = new FotoDocumento();
        fotoDocumento2.setId(fotoDocumento1.getId());
        assertThat(fotoDocumento1).isEqualTo(fotoDocumento2);
        fotoDocumento2.setId(2L);
        assertThat(fotoDocumento1).isNotEqualTo(fotoDocumento2);
        fotoDocumento1.setId(null);
        assertThat(fotoDocumento1).isNotEqualTo(fotoDocumento2);
    }
}
