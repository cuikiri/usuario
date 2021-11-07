import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './documento.reducer';
import { IDocumento } from 'app/shared/model/user/documento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DocumentoDetail = (props: IDocumentoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { documentoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.userDocumento.detail.title">Documento</Translate> [<b>{documentoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="descricao">
              <Translate contentKey="usersApp.userDocumento.descricao">Descricao</Translate>
            </span>
          </dt>
          <dd>{documentoEntity.descricao}</dd>
          <dt>
            <span id="tipo">
              <Translate contentKey="usersApp.userDocumento.tipo">Tipo</Translate>
            </span>
          </dt>
          <dd>{documentoEntity.tipo}</dd>
          <dt>
            <Translate contentKey="usersApp.userDocumento.dadosPessoais">Dados Pessoais</Translate>
          </dt>
          <dd>{documentoEntity.dadosPessoais ? documentoEntity.dadosPessoais.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/documento" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/documento/${documentoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ documento }: IRootState) => ({
  documentoEntity: documento.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DocumentoDetail);
