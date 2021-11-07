import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';
import { getEntities as getDadosPessoais } from 'app/entities/user/dados-pessoais/dados-pessoais.reducer';
import { getEntity, updateEntity, createEntity, reset } from './mensagem.reducer';
import { IMensagem } from 'app/shared/model/user/mensagem.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMensagemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MensagemUpdate = (props: IMensagemUpdateProps) => {
  const [dadosPessoaisId, setDadosPessoaisId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { mensagemEntity, dadosPessoais, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/mensagem' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDadosPessoais();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.data = convertDateTimeToServer(values.data);
    values.leitura = convertDateTimeToServer(values.leitura);

    if (errors.length === 0) {
      const entity = {
        ...mensagemEntity,
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
          <h2 id="usersApp.userMensagem.home.createOrEditLabel">
            <Translate contentKey="usersApp.userMensagem.home.createOrEditLabel">Create or edit a Mensagem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : mensagemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="mensagem-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="mensagem-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataLabel" for="mensagem-data">
                  <Translate contentKey="usersApp.userMensagem.data">Data</Translate>
                </Label>
                <AvInput
                  id="mensagem-data"
                  type="datetime-local"
                  className="form-control"
                  name="data"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.mensagemEntity.data)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="leituraLabel" for="mensagem-leitura">
                  <Translate contentKey="usersApp.userMensagem.leitura">Leitura</Translate>
                </Label>
                <AvInput
                  id="mensagem-leitura"
                  type="datetime-local"
                  className="form-control"
                  name="leitura"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.mensagemEntity.leitura)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tituloLabel" for="mensagem-titulo">
                  <Translate contentKey="usersApp.userMensagem.titulo">Titulo</Translate>
                </Label>
                <AvField
                  id="mensagem-titulo"
                  type="text"
                  name="titulo"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="conteudoLabel" for="mensagem-conteudo">
                  <Translate contentKey="usersApp.userMensagem.conteudo">Conteudo</Translate>
                </Label>
                <AvField
                  id="mensagem-conteudo"
                  type="text"
                  name="conteudo"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 1000, errorMessage: translate('entity.validation.maxlength', { max: 1000 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tipoLabel" for="mensagem-tipo">
                  <Translate contentKey="usersApp.userMensagem.tipo">Tipo</Translate>
                </Label>
                <AvInput
                  id="mensagem-tipo"
                  type="select"
                  className="form-control"
                  name="tipo"
                  value={(!isNew && mensagemEntity.tipo) || 'INFORMACAO'}
                >
                  <option value="INFORMACAO">{translate('usersApp.TipoMensagem.INFORMACAO')}</option>
                  <option value="COMUNICADO">{translate('usersApp.TipoMensagem.COMUNICADO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="mensagem-dadosPessoais">
                  <Translate contentKey="usersApp.userMensagem.dadosPessoais">Dados Pessoais</Translate>
                </Label>
                <AvInput id="mensagem-dadosPessoais" type="select" className="form-control" name="dadosPessoais.id">
                  <option value="" key="0" />
                  {dadosPessoais
                    ? dadosPessoais.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/mensagem" replace color="info">
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
  dadosPessoais: storeState.dadosPessoais.entities,
  mensagemEntity: storeState.mensagem.entity,
  loading: storeState.mensagem.loading,
  updating: storeState.mensagem.updating,
  updateSuccess: storeState.mensagem.updateSuccess,
});

const mapDispatchToProps = {
  getDadosPessoais,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MensagemUpdate);
