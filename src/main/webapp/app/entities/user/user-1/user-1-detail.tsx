import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-1.reducer';
import { IUser1 } from 'app/shared/model/user/user-1.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUser1DetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const User1Detail = (props: IUser1DetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { user1Entity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.userUser1.detail.title">User1</Translate> [<b>{user1Entity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="firstName">
              <Translate contentKey="usersApp.userUser1.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{user1Entity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="usersApp.userUser1.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{user1Entity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="usersApp.userUser1.email">Email</Translate>
            </span>
          </dt>
          <dd>{user1Entity.email}</dd>
          <dt>
            <Translate contentKey="usersApp.userUser1.dadosPessoais">Dados Pessoais</Translate>
          </dt>
          <dd>{user1Entity.dadosPessoais ? user1Entity.dadosPessoais.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/user-1" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-1/${user1Entity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ user1 }: IRootState) => ({
  user1Entity: user1.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(User1Detail);
