import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './aviso.reducer';
import { IAviso } from 'app/shared/model/user/aviso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAvisoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AvisoDetail = (props: IAvisoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { avisoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.userAviso.detail.title">Aviso</Translate> [<b>{avisoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="data">
              <Translate contentKey="usersApp.userAviso.data">Data</Translate>
            </span>
          </dt>
          <dd>{avisoEntity.data ? <TextFormat value={avisoEntity.data} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="leitura">
              <Translate contentKey="usersApp.userAviso.leitura">Leitura</Translate>
            </span>
          </dt>
          <dd>{avisoEntity.leitura ? <TextFormat value={avisoEntity.leitura} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="titulo">
              <Translate contentKey="usersApp.userAviso.titulo">Titulo</Translate>
            </span>
          </dt>
          <dd>{avisoEntity.titulo}</dd>
          <dt>
            <span id="conteudo">
              <Translate contentKey="usersApp.userAviso.conteudo">Conteudo</Translate>
            </span>
          </dt>
          <dd>{avisoEntity.conteudo}</dd>
          <dt>
            <span id="tipo">
              <Translate contentKey="usersApp.userAviso.tipo">Tipo</Translate>
            </span>
          </dt>
          <dd>{avisoEntity.tipo}</dd>
          <dt>
            <Translate contentKey="usersApp.userAviso.dadosPessoais">Dados Pessoais</Translate>
          </dt>
          <dd>{avisoEntity.dadosPessoais ? avisoEntity.dadosPessoais.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/aviso" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/aviso/${avisoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ aviso }: IRootState) => ({
  avisoEntity: aviso.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AvisoDetail);
