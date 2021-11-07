import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foto-icon.reducer';
import { IFotoIcon } from 'app/shared/model/foto/foto-icon.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFotoIconDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FotoIconDetail = (props: IFotoIconDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fotoIconEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.fotoFotoIcon.detail.title">FotoIcon</Translate> [<b>{fotoIconEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="conteudo">
              <Translate contentKey="usersApp.fotoFotoIcon.conteudo">Conteudo</Translate>
            </span>
          </dt>
          <dd>
            {fotoIconEntity.conteudo ? (
              <div>
                {fotoIconEntity.conteudoContentType ? (
                  <a onClick={openFile(fotoIconEntity.conteudoContentType, fotoIconEntity.conteudo)}>
                    <img
                      src={`data:${fotoIconEntity.conteudoContentType};base64,${fotoIconEntity.conteudo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {fotoIconEntity.conteudoContentType}, {byteSize(fotoIconEntity.conteudo)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/foto-icon" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/foto-icon/${fotoIconEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fotoIcon }: IRootState) => ({
  fotoIconEntity: fotoIcon.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FotoIconDetail);
