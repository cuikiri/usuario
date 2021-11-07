package br.com.jhisolution.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import br.com.jhisolution.user.domain.enumeration.EstadoCivil;

import br.com.jhisolution.user.domain.enumeration.Raca;

import br.com.jhisolution.user.domain.enumeration.Religiao;

/**
 * A DadosPessoais.
 */
@Entity
@Table(name = "dados_pessoais")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DadosPessoais implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "nome", length = 20, nullable = false)
    private String nome;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "sobre_nome", length = 50, nullable = false)
    private String sobreNome;

    @Size(min = 1, max = 50)
    @Column(name = "pai", length = 50)
    private String pai;

    @Size(min = 1, max = 50)
    @Column(name = "mae", length = 50)
    private String mae;

    @Size(min = 8, max = 20)
    @Column(name = "telefone", length = 20)
    private String telefone;

    @NotNull
    @Size(min = 8, max = 20)
    @Column(name = "celular", length = 20, nullable = false)
    private String celular;

    @Size(min = 8, max = 20)
    @Column(name = "whatsapp", length = 20)
    private String whatsapp;

    @NotNull
    @Size(min = 9, max = 50)
    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado_civil", nullable = false)
    private EstadoCivil estadoCivil;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "raca", nullable = false)
    private Raca raca;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "religiao", nullable = false)
    private Religiao religiao;

    @OneToOne
    @JoinColumn(unique = true)
    private Foto foto;

    @OneToOne
    @JoinColumn(unique = true)
    private FotoAvatar fotoAvatar;

    @OneToOne
    @JoinColumn(unique = true)
    private FotoIcon fotoIcon;

    @OneToMany(mappedBy = "dadosPessoais")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Mensagem> mensagems = new HashSet<>();

    @OneToMany(mappedBy = "dadosPessoais")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Aviso> avisos = new HashSet<>();

    @OneToMany(mappedBy = "dadosPessoais")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Documento> documentos = new HashSet<>();

    @OneToMany(mappedBy = "dadosPessoais")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Endereco> enderecos = new HashSet<>();

    @OneToOne(mappedBy = "dadosPessoais")
    @JsonIgnore
    private User1 user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public DadosPessoais nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobreNome() {
        return sobreNome;
    }

    public DadosPessoais sobreNome(String sobreNome) {
        this.sobreNome = sobreNome;
        return this;
    }

    public void setSobreNome(String sobreNome) {
        this.sobreNome = sobreNome;
    }

    public String getPai() {
        return pai;
    }

    public DadosPessoais pai(String pai) {
        this.pai = pai;
        return this;
    }

    public void setPai(String pai) {
        this.pai = pai;
    }

    public String getMae() {
        return mae;
    }

    public DadosPessoais mae(String mae) {
        this.mae = mae;
        return this;
    }

    public void setMae(String mae) {
        this.mae = mae;
    }

    public String getTelefone() {
        return telefone;
    }

    public DadosPessoais telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCelular() {
        return celular;
    }

    public DadosPessoais celular(String celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public DadosPessoais whatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
        return this;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getEmail() {
        return email;
    }

    public DadosPessoais email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EstadoCivil getEstadoCivil() {
        return estadoCivil;
    }

    public DadosPessoais estadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil;
        return this;
    }

    public void setEstadoCivil(EstadoCivil estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public Raca getRaca() {
        return raca;
    }

    public DadosPessoais raca(Raca raca) {
        this.raca = raca;
        return this;
    }

    public void setRaca(Raca raca) {
        this.raca = raca;
    }

    public Religiao getReligiao() {
        return religiao;
    }

    public DadosPessoais religiao(Religiao religiao) {
        this.religiao = religiao;
        return this;
    }

    public void setReligiao(Religiao religiao) {
        this.religiao = religiao;
    }

    public Foto getFoto() {
        return foto;
    }

    public DadosPessoais foto(Foto foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(Foto foto) {
        this.foto = foto;
    }

    public FotoAvatar getFotoAvatar() {
        return fotoAvatar;
    }

    public DadosPessoais fotoAvatar(FotoAvatar fotoAvatar) {
        this.fotoAvatar = fotoAvatar;
        return this;
    }

    public void setFotoAvatar(FotoAvatar fotoAvatar) {
        this.fotoAvatar = fotoAvatar;
    }

    public FotoIcon getFotoIcon() {
        return fotoIcon;
    }

    public DadosPessoais fotoIcon(FotoIcon fotoIcon) {
        this.fotoIcon = fotoIcon;
        return this;
    }

    public void setFotoIcon(FotoIcon fotoIcon) {
        this.fotoIcon = fotoIcon;
    }

    public Set<Mensagem> getMensagems() {
        return mensagems;
    }

    public DadosPessoais mensagems(Set<Mensagem> mensagems) {
        this.mensagems = mensagems;
        return this;
    }

    public DadosPessoais addMensagem(Mensagem mensagem) {
        this.mensagems.add(mensagem);
        mensagem.setDadosPessoais(this);
        return this;
    }

    public DadosPessoais removeMensagem(Mensagem mensagem) {
        this.mensagems.remove(mensagem);
        mensagem.setDadosPessoais(null);
        return this;
    }

    public void setMensagems(Set<Mensagem> mensagems) {
        this.mensagems = mensagems;
    }

    public Set<Aviso> getAvisos() {
        return avisos;
    }

    public DadosPessoais avisos(Set<Aviso> avisos) {
        this.avisos = avisos;
        return this;
    }

    public DadosPessoais addAviso(Aviso aviso) {
        this.avisos.add(aviso);
        aviso.setDadosPessoais(this);
        return this;
    }

    public DadosPessoais removeAviso(Aviso aviso) {
        this.avisos.remove(aviso);
        aviso.setDadosPessoais(null);
        return this;
    }

    public void setAvisos(Set<Aviso> avisos) {
        this.avisos = avisos;
    }

    public Set<Documento> getDocumentos() {
        return documentos;
    }

    public DadosPessoais documentos(Set<Documento> documentos) {
        this.documentos = documentos;
        return this;
    }

    public DadosPessoais addDocumento(Documento documento) {
        this.documentos.add(documento);
        documento.setDadosPessoais(this);
        return this;
    }

    public DadosPessoais removeDocumento(Documento documento) {
        this.documentos.remove(documento);
        documento.setDadosPessoais(null);
        return this;
    }

    public void setDocumentos(Set<Documento> documentos) {
        this.documentos = documentos;
    }

    public Set<Endereco> getEnderecos() {
        return enderecos;
    }

    public DadosPessoais enderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
        return this;
    }

    public DadosPessoais addEndereco(Endereco endereco) {
        this.enderecos.add(endereco);
        endereco.setDadosPessoais(this);
        return this;
    }

    public DadosPessoais removeEndereco(Endereco endereco) {
        this.enderecos.remove(endereco);
        endereco.setDadosPessoais(null);
        return this;
    }

    public void setEnderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    public User1 getUser() {
        return user;
    }

    public DadosPessoais user(User1 user1) {
        this.user = user1;
        return this;
    }

    public void setUser(User1 user1) {
        this.user = user1;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DadosPessoais)) {
            return false;
        }
        return id != null && id.equals(((DadosPessoais) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DadosPessoais{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sobreNome='" + getSobreNome() + "'" +
            ", pai='" + getPai() + "'" +
            ", mae='" + getMae() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", celular='" + getCelular() + "'" +
            ", whatsapp='" + getWhatsapp() + "'" +
            ", email='" + getEmail() + "'" +
            ", estadoCivil='" + getEstadoCivil() + "'" +
            ", raca='" + getRaca() + "'" +
            ", religiao='" + getReligiao() + "'" +
            "}";
    }
}
