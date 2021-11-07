import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFoto } from 'app/shared/model/foto/foto.model';
import { getEntities as getFotos } from 'app/entities/foto/foto/foto.reducer';
import { IFotoAvatar } from 'app/shared/model/foto/foto-avatar.model';
import { getEntities as getFotoAvatars } from 'app/entities/foto/foto-avatar/foto-avatar.reducer';
import { IFotoIcon } from 'app/shared/model/foto/foto-icon.model';
import { getEntities as getFotoIcons } from 'app/entities/foto/foto-icon/foto-icon.reducer';
import { IUser1 } from 'app/shared/model/user/user-1.model';
import { getEntities as getUser1S } from 'app/entities/user/user-1/user-1.reducer';
import { getEntity, updateEntity, createEntity, reset } from './dados-pessoais.reducer';
import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDadosPessoaisUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DadosPessoaisUpdate = (props: IDadosPessoaisUpdateProps) => {
  const [fotoId, setFotoId] = useState('0');
  const [fotoAvatarId, setFotoAvatarId] = useState('0');
  const [fotoIconId, setFotoIconId] = useState('0');
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { dadosPessoaisEntity, fotos, fotoAvatars, fotoIcons, user1s, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/dados-pessoais' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getFotos();
    props.getFotoAvatars();
    props.getFotoIcons();
    props.getUser1S();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...dadosPessoaisEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="usersApp.userDadosPessoais.home.createOrEditLabel">
            <Translate contentKey="usersApp.userDadosPessoais.home.createOrEditLabel">Create or edit a DadosPessoais</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : dadosPessoaisEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="dados-pessoais-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="dados-pessoais-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="dados-pessoais-nome">
                  <Translate contentKey="usersApp.userDadosPessoais.nome">Nome</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-nome"
                  type="text"
                  name="nome"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sobreNomeLabel" for="dados-pessoais-sobreNome">
                  <Translate contentKey="usersApp.userDadosPessoais.sobreNome">Sobre Nome</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-sobreNome"
                  type="text"
                  name="sobreNome"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="paiLabel" for="dados-pessoais-pai">
                  <Translate contentKey="usersApp.userDadosPessoais.pai">Pai</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-pai"
                  type="text"
                  name="pai"
                  validate={{
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="maeLabel" for="dados-pessoais-mae">
                  <Translate contentKey="usersApp.userDadosPessoais.mae">Mae</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-mae"
                  type="text"
                  name="mae"
                  validate={{
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="telefoneLabel" for="dados-pessoais-telefone">
                  <Translate contentKey="usersApp.userDadosPessoais.telefone">Telefone</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-telefone"
                  type="text"
                  name="telefone"
                  validate={{
                    minLength: { value: 8, errorMessage: translate('entity.validation.minlength', { min: 8 }) },
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="celularLabel" for="dados-pessoais-celular">
                  <Translate contentKey="usersApp.userDadosPessoais.celular">Celular</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-celular"
                  type="text"
                  name="celular"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 8, errorMessage: translate('entity.validation.minlength', { min: 8 }) },
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="whatsappLabel" for="dados-pessoais-whatsapp">
                  <Translate contentKey="usersApp.userDadosPessoais.whatsapp">Whatsapp</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-whatsapp"
                  type="text"
                  name="whatsapp"
                  validate={{
                    minLength: { value: 8, errorMessage: translate('entity.validation.minlength', { min: 8 }) },
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="dados-pessoais-email">
                  <Translate contentKey="usersApp.userDadosPessoais.email">Email</Translate>
                </Label>
                <AvField
                  id="dados-pessoais-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 9, errorMessage: translate('entity.validation.minlength', { min: 9 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="estadoCivilLabel" for="dados-pessoais-estadoCivil">
                  <Translate contentKey="usersApp.userDadosPessoais.estadoCivil">Estado Civil</Translate>
                </Label>
                <AvInput
                  id="dados-pessoais-estadoCivil"
                  type="select"
                  className="form-control"
                  name="estadoCivil"
                  value={(!isNew && dadosPessoaisEntity.estadoCivil) || 'SOLTEIRO'}
                >
                  <option value="SOLTEIRO">{translate('usersApp.EstadoCivil.SOLTEIRO')}</option>
                  <option value="CASADO">{translate('usersApp.EstadoCivil.CASADO')}</option>
                  <option value="SEPARADO">{translate('usersApp.EstadoCivil.SEPARADO')}</option>
                  <option value="DIVOROCIADO">{translate('usersApp.EstadoCivil.DIVOROCIADO')}</option>
                  <option value="VIUVO">{translate('usersApp.EstadoCivil.VIUVO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="racaLabel" for="dados-pessoais-raca">
                  <Translate contentKey="usersApp.userDadosPessoais.raca">Raca</Translate>
                </Label>
                <AvInput
                  id="dados-pessoais-raca"
                  type="select"
                  className="form-control"
                  name="raca"
                  value={(!isNew && dadosPessoaisEntity.raca) || 'BRANCO'}
                >
                  <option value="BRANCO">{translate('usersApp.Raca.BRANCO')}</option>
                  <option value="PARDA">{translate('usersApp.Raca.PARDA')}</option>
                  <option value="NEGRA">{translate('usersApp.Raca.NEGRA')}</option>
                  <option value="AMARELA">{translate('usersApp.Raca.AMARELA')}</option>
                  <option value="INDIGENA">{translate('usersApp.Raca.INDIGENA')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="religiaoLabel" for="dados-pessoais-religiao">
                  <Translate contentKey="usersApp.userDadosPessoais.religiao">Religiao</Translate>
                </Label>
                <AvInput
                  id="dados-pessoais-religiao"
                  type="select"
                  className="form-control"
                  name="religiao"
                  value={(!isNew && dadosPessoaisEntity.religiao) || 'CATOLICO'}
                >
                  <option value="CATOLICO">{translate('usersApp.Religiao.CATOLICO')}</option>
                  <option value="PROTESTANTE">{translate('usersApp.Religiao.PROTESTANTE')}</option>
                  <option value="EVANGELICO">{translate('usersApp.Religiao.EVANGELICO')}</option>
                  <option value="ESPIRITA">{translate('usersApp.Religiao.ESPIRITA')}</option>
                  <option value="AFRO_BRASILEIRA">{translate('usersApp.Religiao.AFRO_BRASILEIRA')}</option>
                  <option value="BUDISMO">{translate('usersApp.Religiao.BUDISMO')}</option>
                  <option value="JUDAICA">{translate('usersApp.Religiao.JUDAICA')}</option>
                  <option value="OUTRA">{translate('usersApp.Religiao.OUTRA')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="dados-pessoais-foto">
                  <Translate contentKey="usersApp.userDadosPessoais.foto">Foto</Translate>
                </Label>
                <AvInput id="dados-pessoais-foto" type="select" className="form-control" name="foto.id">
                  <option value="" key="0" />
                  {fotos
                    ? fotos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="dados-pessoais-fotoAvatar">
                  <Translate contentKey="usersApp.userDadosPessoais.fotoAvatar">Foto Avatar</Translate>
                </Label>
                <AvInput id="dados-pessoais-fotoAvatar" type="select" className="form-control" name="fotoAvatar.id">
                  <option value="" key="0" />
                  {fotoAvatars
                    ? fotoAvatars.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="dados-pessoais-fotoIcon">
                  <Translate contentKey="usersApp.userDadosPessoais.fotoIcon">Foto Icon</Translate>
                </Label>
                <AvInput id="dados-pessoais-fotoIcon" type="select" className="form-control" name="fotoIcon.id">
                  <option value="" key="0" />
                  {fotoIcons
                    ? fotoIcons.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/dados-pessoais" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  fotos: storeState.foto.entities,
  fotoAvatars: storeState.fotoAvatar.entities,
  fotoIcons: storeState.fotoIcon.entities,
  user1s: storeState.user1.entities,
  dadosPessoaisEntity: storeState.dadosPessoais.entity,
  loading: storeState.dadosPessoais.loading,
  updating: storeState.dadosPessoais.updating,
  updateSuccess: storeState.dadosPessoais.updateSuccess,
});

const mapDispatchToProps = {
  getFotos,
  getFotoAvatars,
  getFotoIcons,
  getUser1S,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DadosPessoaisUpdate);
