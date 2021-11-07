package br.com.jhisolution.user.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.jhisolution.user.web.rest.TestUtil;

public class FotoAvatarTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FotoAvatar.class);
        FotoAvatar fotoAvatar1 = new FotoAvatar();
        fotoAvatar1.setId(1L);
        FotoAvatar fotoAvatar2 = new FotoAvatar();
        fotoAvatar2.setId(fotoAvatar1.getId());
        assertThat(fotoAvatar1).isEqualTo(fotoAvatar2);
        fotoAvatar2.setId(2L);
        assertThat(fotoAvatar1).isNotEqualTo(fotoAvatar2);
        fotoAvatar1.setId(null);
        assertThat(fotoAvatar1).isNotEqualTo(fotoAvatar2);
    }
}
