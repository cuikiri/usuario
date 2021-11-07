package br.com.jhisolution.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import br.com.jhisolution.user.domain.enumeration.TipoDocumento;

/**
 * A Documento.
 */
@Entity
@Table(name = "documento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Documento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "descricao", length = 50, nullable = false)
    private String descricao;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo", nullable = false)
    private TipoDocumento tipo;

    @OneToMany(mappedBy = "documento")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<FotoDocumento> fotos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "documentos", allowSetters = true)
    private DadosPessoais dadosPessoais;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Documento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public TipoDocumento getTipo() {
        return tipo;
    }

    public Documento tipo(TipoDocumento tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoDocumento tipo) {
        this.tipo = tipo;
    }

    public Set<FotoDocumento> getFotos() {
        return fotos;
    }

    public Documento fotos(Set<FotoDocumento> fotoDocumentos) {
        this.fotos = fotoDocumentos;
        return this;
    }

    public Documento addFoto(FotoDocumento fotoDocumento) {
        this.fotos.add(fotoDocumento);
        fotoDocumento.setDocumento(this);
        return this;
    }

    public Documento removeFoto(FotoDocumento fotoDocumento) {
        this.fotos.remove(fotoDocumento);
        fotoDocumento.setDocumento(null);
        return this;
    }

    public void setFotos(Set<FotoDocumento> fotoDocumentos) {
        this.fotos = fotoDocumentos;
    }

    public DadosPessoais getDadosPessoais() {
        return dadosPessoais;
    }

    public Documento dadosPessoais(DadosPessoais dadosPessoais) {
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
        if (!(o instanceof Documento)) {
            return false;
        }
        return id != null && id.equals(((Documento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Documento{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
