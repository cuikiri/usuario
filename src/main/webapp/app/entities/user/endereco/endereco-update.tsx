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
import { getEntity, updateEntity, createEntity, reset } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/user/endereco.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnderecoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnderecoUpdate = (props: IEnderecoUpdateProps) => {
  const [dadosPessoaisId, setDadosPessoaisId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { enderecoEntity, dadosPessoais, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/endereco' + props.location.search);
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
        ...enderecoEntity,
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
          <h2 id="usersApp.userEndereco.home.createOrEditLabel">
            <Translate contentKey="usersApp.userEndereco.home.createOrEditLabel">Create or edit a Endereco</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : enderecoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="endereco-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="endereco-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cepLabel" for="endereco-cep">
                  <Translate contentKey="usersApp.userEndereco.cep">Cep</Translate>
                </Label>
                <AvField
                  id="endereco-cep"
                  type="text"
                  name="cep"
                  validate={{
                    minLength: { value: 8, errorMessage: translate('entity.validation.minlength', { min: 8 }) },
                    maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="logradouroLabel" for="endereco-logradouro">
                  <Translate contentKey="usersApp.userEndereco.logradouro">Logradouro</Translate>
                </Label>
                <AvField
                  id="endereco-logradouro"
                  type="text"
                  name="logradouro"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="complemento1Label" for="endereco-complemento1">
                  <Translate contentKey="usersApp.userEndereco.complemento1">Complemento 1</Translate>
                </Label>
                <AvField
                  id="endereco-complemento1"
                  type="text"
                  name="complemento1"
                  validate={{
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="complemento2Label" for="endereco-complemento2">
                  <Translate contentKey="usersApp.userEndereco.complemento2">Complemento 2</Translate>
                </Label>
                <AvField
                  id="endereco-complemento2"
                  type="text"
                  name="complemento2"
                  validate={{
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="numeroLabel" for="endereco-numero">
                  <Translate contentKey="usersApp.userEndereco.numero">Numero</Translate>
                </Label>
                <AvField
                  id="endereco-numero"
                  type="text"
                  name="numero"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="bairroLabel" for="endereco-bairro">
                  <Translate contentKey="usersApp.userEndereco.bairro">Bairro</Translate>
                </Label>
                <AvField
                  id="endereco-bairro"
                  type="text"
                  name="bairro"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="localidadeLabel" for="endereco-localidade">
                  <Translate contentKey="usersApp.userEndereco.localidade">Localidade</Translate>
                </Label>
                <AvField
                  id="endereco-localidade"
                  type="text"
                  name="localidade"
                  validate={{
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="ufLabel" for="endereco-uf">
                  <Translate contentKey="usersApp.userEndereco.uf">Uf</Translate>
                </Label>
                <AvField
                  id="endereco-uf"
                  type="text"
                  name="uf"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="unidadeLabel" for="endereco-unidade">
                  <Translate contentKey="usersApp.userEndereco.unidade">Unidade</Translate>
                </Label>
                <AvField
                  id="endereco-unidade"
                  type="text"
                  name="unidade"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="ibgeLabel" for="endereco-ibge">
                  <Translate contentKey="usersApp.userEndereco.ibge">Ibge</Translate>
                </Label>
                <AvField id="endereco-ibge" type="text" name="ibge" />
              </AvGroup>
              <AvGroup>
                <Label id="giaLabel" for="endereco-gia">
                  <Translate contentKey="usersApp.userEndereco.gia">Gia</Translate>
                </Label>
                <AvField id="endereco-gia" type="text" name="gia" />
              </AvGroup>
              <AvGroup>
                <Label id="latitudeLabel" for="endereco-latitude">
                  <Translate contentKey="usersApp.userEndereco.latitude">Latitude</Translate>
                </Label>
                <AvField id="endereco-latitude" type="string" className="form-control" name="latitude" />
              </AvGroup>
              <AvGroup>
                <Label id="longitudeLabel" for="endereco-longitude">
                  <Translate contentKey="usersApp.userEndereco.longitude">Longitude</Translate>
                </Label>
                <AvField id="endereco-longitude" type="string" className="form-control" name="longitude" />
              </AvGroup>
              <AvGroup>
                <Label for="endereco-dadosPessoais">
                  <Translate contentKey="usersApp.userEndereco.dadosPessoais">Dados Pessoais</Translate>
                </Label>
                <AvInput id="endereco-dadosPessoais" type="select" className="form-control" name="dadosPessoais.id">
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
              <Button tag={Link} id="cancel-save" to="/endereco" replace color="info">
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
  enderecoEntity: storeState.endereco.entity,
  loading: storeState.endereco.loading,
  updating: storeState.endereco.updating,
  updateSuccess: storeState.endereco.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(EnderecoUpdate);
