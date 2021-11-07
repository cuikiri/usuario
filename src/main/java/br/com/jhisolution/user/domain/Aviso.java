package br.com.jhisolution.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import br.com.jhisolution.user.domain.enumeration.TipoAviso;

/**
 * A Aviso.
 */
@Entity
@Table(name = "aviso")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Aviso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "data", nullable = false)
    private ZonedDateTime data;

    @Column(name = "leitura")
    private ZonedDateTime leitura;

    @NotNull
    @Size(min = 1, max = 40)
    @Column(name = "titulo", length = 40, nullable = false)
    private String titulo;

    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "conteudo", length = 1000, nullable = false)
    private String conteudo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoAviso tipo;

    @ManyToOne
    @JsonIgnoreProperties(value = "avisos", allowSetters = true)
    private DadosPessoais dadosPessoais;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getData() {
        return data;
    }

    public Aviso data(ZonedDateTime data) {
        this.data = data;
        return this;
    }

    public void setData(ZonedDateTime data) {
        this.data = data;
    }

    public ZonedDateTime getLeitura() {
        return leitura;
    }

    public Aviso leitura(ZonedDateTime leitura) {
        this.leitura = leitura;
        return this;
    }

    public void setLeitura(ZonedDateTime leitura) {
        this.leitura = leitura;
    }

    public String getTitulo() {
        return titulo;
    }

    public Aviso titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public Aviso conteudo(String conteudo) {
        this.conteudo = conteudo;
        return this;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public TipoAviso getTipo() {
        return tipo;
    }

    public Aviso tipo(TipoAviso tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoAviso tipo) {
        this.tipo = tipo;
    }

    public DadosPessoais getDadosPessoais() {
        return dadosPessoais;
    }

    public Aviso dadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
        return this;
    }

    public void setDadosPessoais(DadosPessoais dadosPessoais) {
        this.dadosPessoais = dadosPessoais;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aviso)) {
            return false;
        }
        return id != null && id.equals(((Aviso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aviso{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", leitura='" + getLeitura() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", conteudo='" + getConteudo() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
