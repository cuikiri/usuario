import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foto-documento.reducer';
import { IFotoDocumento } from 'app/shared/model/foto/foto-documento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFotoDocumentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FotoDocumentoDetail = (props: IFotoDocumentoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fotoDocumentoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.fotoFotoDocumento.detail.title">FotoDocumento</Translate> [<b>{fotoDocumentoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="conteudo">
              <Translate contentKey="usersApp.fotoFotoDocumento.conteudo">Conteudo</Translate>
            </span>
          </dt>
          <dd>
            {fotoDocumentoEntity.conteudo ? (
              <div>
                {fotoDocumentoEntity.conteudoContentType ? (
                  <a onClick={openFile(fotoDocumentoEntity.conteudoContentType, fotoDocumentoEntity.conteudo)}>
                    <img
                      src={`data:${fotoDocumentoEntity.conteudoContentType};base64,${fotoDocumentoEntity.conteudo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {fotoDocumentoEntity.conteudoContentType}, {byteSize(fotoDocumentoEntity.conteudo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="usersApp.fotoFotoDocumento.documento">Documento</Translate>
          </dt>
          <dd>{fotoDocumentoEntity.documento ? fotoDocumentoEntity.documento.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/foto-documento" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/foto-documento/${fotoDocumentoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fotoDocumento }: IRootState) => ({
  fotoDocumentoEntity: fotoDocumento.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FotoDocumentoDetail);
