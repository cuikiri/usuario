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
import { getEntity, updateEntity, createEntity, reset } from './user-1.reducer';
import { IUser1 } from 'app/shared/model/user/user-1.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUser1UpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const User1Update = (props: IUser1UpdateProps) => {
  const [dadosPessoaisId, setDadosPessoaisId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { user1Entity, dadosPessoais, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/user-1' + props.location.search);
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
        ...user1Entity,
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
          <h2 id="usersApp.userUser1.home.createOrEditLabel">
            <Translate contentKey="usersApp.userUser1.home.createOrEditLabel">Create or edit a User1</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : user1Entity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="user-1-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="user-1-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="user-1-firstName">
                  <Translate contentKey="usersApp.userUser1.firstName">First Name</Translate>
                </Label>
                <AvField
                  id="user-1-firstName"
                  type="text"
                  name="firstName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="user-1-lastName">
                  <Translate contentKey="usersApp.userUser1.lastName">Last Name</Translate>
                </Label>
                <AvField
                  id="user-1-lastName"
                  type="text"
                  name="lastName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="user-1-email">
                  <Translate contentKey="usersApp.userUser1.email">Email</Translate>
                </Label>
                <AvField
                  id="user-1-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    minLength: { value: 1, errorMessage: translate('entity.validation.minlength', { min: 1 }) },
                    maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="user-1-dadosPessoais">
                  <Translate contentKey="usersApp.userUser1.dadosPessoais">Dados Pessoais</Translate>
                </Label>
                <AvInput id="user-1-dadosPessoais" type="select" className="form-control" name="dadosPessoais.id">
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
              <Button tag={Link} id="cancel-save" to="/user-1" replace color="info">
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
  user1Entity: storeState.user1.entity,
  loading: storeState.user1.loading,
  updating: storeState.user1.updating,
  updateSuccess: storeState.user1.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(User1Update);
