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
import { getEntity, updateEntity, createEntity, reset } from './aviso.reducer';
import { IAviso } from 'app/shared/model/user/aviso.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAvisoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvisoUpdate = (props: IAvisoUpdateProps) => {
  const [dadosPessoaisId, setDadosPessoaisId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { avisoEntity, dadosPessoais, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/aviso' + props.location.search);
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
        ...avisoEntity,
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
          <h2 id="usersApp.userAviso.home.createOrEditLabel">
            <Translate contentKey="usersApp.userAviso.home.createOrEditLabel">Create or edit a Aviso</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : avisoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="aviso-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="aviso-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataLabel" for="aviso-data">
                  <Translate contentKey="usersApp.userAviso.data">Data</Translate>
                </Label>
                <AvInput
                  id="aviso-data"
                  type="datetime-local"
                  className="form-control"
                  name="data"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.avisoEntity.data)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="leituraLabel" for="aviso-leitura">
                  <Translate contentKey="usersApp.userAviso.leitura">Leitura</Translate>
                </Label>
                <AvInput
                  id="aviso-leitura"
                  type="datetime-local"
                  className="form-control"
                  name="leitura"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.avisoEntity.leitura)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tituloLabel" for="aviso-titulo">
                  <Translate contentKey="usersApp.userAviso.titulo">Titulo</Translate>
                </Label>
                <AvField
                  id="aviso-titulo"
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
                <Label id="conteudoLabel" for="aviso-conteudo">
                  <Translate contentKey="usersApp.userAviso.conteudo">Conteudo</Translate>
                </Label>
                <AvField
                  id="aviso-conteudo"
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
                <Label id="tipoLabel" for="aviso-tipo">
                  <Translate contentKey="usersApp.userAviso.tipo">Tipo</Translate>
                </Label>
                <AvInput
                  id="aviso-tipo"
                  type="select"
                  className="form-control"
                  name="tipo"
                  value={(!isNew && avisoEntity.tipo) || 'SOLICITACAO'}
                >
                  <option value="SOLICITACAO">{translate('usersApp.TipoAviso.SOLICITACAO')}</option>
                  <option value="ADVERTENCIA">{translate('usersApp.TipoAviso.ADVERTENCIA')}</option>
                  <option value="SUSPENSAO">{translate('usersApp.TipoAviso.SUSPENSAO')}</option>
                  <option value="REUNIAO">{translate('usersApp.TipoAviso.REUNIAO')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="aviso-dadosPessoais">
                  <Translate contentKey="usersApp.userAviso.dadosPessoais">Dados Pessoais</Translate>
                </Label>
                <AvInput id="aviso-dadosPessoais" type="select" className="form-control" name="dadosPessoais.id">
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
              <Button tag={Link} id="cancel-save" to="/aviso" replace color="info">
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
  avisoEntity: storeState.aviso.entity,
  loading: storeState.aviso.loading,
  updating: storeState.aviso.updating,
  updateSuccess: storeState.aviso.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(AvisoUpdate);
