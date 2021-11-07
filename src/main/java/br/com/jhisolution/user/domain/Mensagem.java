package br.com.jhisolution.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import br.com.jhisolution.user.domain.enumeration.TipoMensagem;

/**
 * A Mensagem.
 */
@Entity
@Table(name = "mensagem")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Mensagem implements Serializable {

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
    private TipoMensagem tipo;

    @ManyToOne
    @JsonIgnoreProperties(value = "mensagems", allowSetters = true)
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

    public Mensagem data(ZonedDateTime data) {
        this.data = data;
        return this;
    }

    public void setData(ZonedDateTime data) {
        this.data = data;
    }

    public ZonedDateTime getLeitura() {
        return leitura;
    }

    public Mensagem leitura(ZonedDateTime leitura) {
        this.leitura = leitura;
        return this;
    }

    public void setLeitura(ZonedDateTime leitura) {
        this.leitura = leitura;
    }

    public String getTitulo() {
        return titulo;
    }

    public Mensagem titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public Mensagem conteudo(String conteudo) {
        this.conteudo = conteudo;
        return this;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public TipoMensagem getTipo() {
        return tipo;
    }

    public Mensagem tipo(TipoMensagem tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoMensagem tipo) {
        this.tipo = tipo;
    }

    public DadosPessoais getDadosPessoais() {
        return dadosPessoais;
    }

    public Mensagem dadosPessoais(DadosPessoais dadosPessoais) {
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
        if (!(o instanceof Mensagem)) {
            return false;
        }
        return id != null && id.equals(((Mensagem) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Mensagem{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", leitura='" + getLeitura() + "'" +
            ", titulo='" + getTitulo() + "'" +
            ", conteudo='" + getConteudo() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
