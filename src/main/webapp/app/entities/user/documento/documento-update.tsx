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
import { getEntity, updateEntity, createEntity, reset } from './documento.reducer';
import { IDocumento } from 'app/shared/model/user/documento.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDocumentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentoUpdate = (props: IDocumentoUpdateProps) => {
  const [dadosPessoaisId, setDadosPessoaisId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { documentoEntity, dadosPessoais, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/documento' + props.location.search);
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
    if (errors.length === 0) {
      const entity = {
        ...documentoEntity,
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
          <h2 id="usersApp.userDocumento.home.createOrEditLabel">
            <Translate contentKey="usersApp.userDocumento.home.createOrEditLabel">Create or edit a Documento</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : documentoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="documento-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="documento-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descricaoLabel" for="documento-descricao">
                  <Translate contentKey="usersApp.userDocumento.descricao">Descricao</Translate>
                </Label>
                <AvField
                  id="documento-descricao"
                  type="text"
                  name="descricao"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="tipoLabel" for="documento-tipo">
                  <Translate contentKey="usersApp.userDocumento.tipo">Tipo</Translate>
                </Label>
                <AvInput
                  id="documento-tipo"
                  type="select"
                  className="form-control"
                  name="tipo"
                  value={(!isNew && documentoEntity.tipo) || 'RG'}
                >
                  <option value="RG">{translate('usersApp.TipoDocumento.RG')}</option>
                  <option value="CPF">{translate('usersApp.TipoDocumento.CPF')}</option>
                  <option value="NASCIMENTO">{translate('usersApp.TipoDocumento.NASCIMENTO')}</option>
                  <option value="CNH">{translate('usersApp.TipoDocumento.CNH')}</option>
                  <option value="CASAMENTO">{translate('usersApp.TipoDocumento.CASAMENTO')}</option>
                  <option value="LUZ">{translate('usersApp.TipoDocumento.LUZ')}</option>
                  <option value="AGUA">{translate('usersApp.TipoDocumento.AGUA')}</option>
                  <option value="TELEFONE">{translate('usersApp.TipoDocumento.TELEFONE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="documento-dadosPessoais">
                  <Translate contentKey="usersApp.userDocumento.dadosPessoais">Dados Pessoais</Translate>
                </Label>
                <AvInput id="documento-dadosPessoais" type="select" className="form-control" name="dadosPessoais.id">
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
              <Button tag={Link} id="cancel-save" to="/documento" replace color="info">
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
  documentoEntity: storeState.documento.entity,
  loading: storeState.documento.loading,
  updating: storeState.documento.updating,
  updateSuccess: storeState.documento.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentoUpdate);
