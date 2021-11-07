package br.com.jhisolution.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Endereco.
 */
@Entity
@Table(name = "endereco")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Endereco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 8, max = 10)
    @Column(name = "cep", length = 10)
    private String cep;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "logradouro", length = 50, nullable = false)
    private String logradouro;

    @Size(min = 1, max = 50)
    @Column(name = "complemento_1", length = 50)
    private String complemento1;

    @Size(min = 1, max = 50)
    @Column(name = "complemento_2", length = 50)
    private String complemento2;

    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "numero", length = 10, nullable = false)
    private String numero;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "bairro", length = 50, nullable = false)
    private String bairro;

    @Size(min = 1, max = 50)
    @Column(name = "localidade", length = 50)
    private String localidade;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "uf", length = 50, nullable = false)
    private String uf;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "unidade", length = 20, nullable = false)
    private String unidade;

    @Column(name = "ibge")
    private String ibge;

    @Column(name = "gia")
    private String gia;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @ManyToOne
    @JsonIgnoreProperties(value = "enderecos", allowSetters = true)
    private DadosPessoais dadosPessoais;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCep() {
        return cep;
    }

    public Endereco cep(String cep) {
        this.cep = cep;
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public Endereco logradouro(String logradouro) {
        this.logradouro = logradouro;
        return this;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getComplemento1() {
        return complemento1;
    }

    public Endereco complemento1(String complemento1) {
        this.complemento1 = complemento1;
        return this;
    }

    public void setComplemento1(String complemento1) {
        this.complemento1 = complemento1;
    }

    public String getComplemento2() {
        return complemento2;
    }

    public Endereco complemento2(String complemento2) {
        this.complemento2 = complemento2;
        return this;
    }

    public void setComplemento2(String complemento2) {
        this.complemento2 = complemento2;
    }

    public String getNumero() {
        return numero;
    }

    public Endereco numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return bairro;
    }

    public Endereco bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getLocalidade() {
        return localidade;
    }

    public Endereco localidade(String localidade) {
        this.localidade = localidade;
        return this;
    }

    public void setLocalidade(String localidade) {
        this.localidade = localidade;
    }

    public String getUf() {
        return uf;
    }

    public Endereco uf(String uf) {
        this.uf = uf;
        return this;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getUnidade() {
        return unidade;
    }

    public Endereco unidade(String unidade) {
        this.unidade = unidade;
        return this;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public String getIbge() {
        return ibge;
    }

    public Endereco ibge(String ibge) {
        this.ibge = ibge;
        return this;
    }

    public void setIbge(String ibge) {
        this.ibge = ibge;
    }

    public String getGia() {
        return gia;
    }

    public Endereco gia(String gia) {
        this.gia = gia;
        return this;
    }

    public void setGia(String gia) {
        this.gia = gia;
    }

    public Float getLatitude() {
        return latitude;
    }

    public Endereco latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public Endereco longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public DadosPessoais getDadosPessoais() {
        return dadosPessoais;
    }

    public Endereco dadosPessoais(DadosPessoais dadosPessoais) {
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
        if (!(o instanceof Endereco)) {
            return false;
        }
        return id != null && id.equals(((Endereco) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Endereco{" +
            "id=" + getId() +
            ", cep='" + getCep() + "'" +
            ", logradouro='" + getLogradouro() + "'" +
            ", complemento1='" + getComplemento1() + "'" +
            ", complemento2='" + getComplemento2() + "'" +
            ", numero='" + getNumero() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", localidade='" + getLocalidade() + "'" +
            ", uf='" + getUf() + "'" +
            ", unidade='" + getUnidade() + "'" +
            ", ibge='" + getIbge() + "'" +
            ", gia='" + getGia() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            "}";
    }
}
