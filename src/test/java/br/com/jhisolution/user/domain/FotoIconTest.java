package br.com.jhisolution.user.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.jhisolution.user.web.rest.TestUtil;

public class FotoIconTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FotoIcon.class);
        FotoIcon fotoIcon1 = new FotoIcon();
        fotoIcon1.setId(1L);
        FotoIcon fotoIcon2 = new FotoIcon();
        fotoIcon2.setId(fotoIcon1.getId());
        assertThat(fotoIcon1).isEqualTo(fotoIcon2);
        fotoIcon2.setId(2L);
        assertThat(fotoIcon1).isNotEqualTo(fotoIcon2);
        fotoIcon1.setId(null);
        assertThat(fotoIcon1).isNotEqualTo(fotoIcon2);
    }
}
