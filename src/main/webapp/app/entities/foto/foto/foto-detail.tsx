import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foto.reducer';
import { IFoto } from 'app/shared/model/foto/foto.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FotoDetail = (props: IFotoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fotoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.fotoFoto.detail.title">Foto</Translate> [<b>{fotoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="conteudo">
              <Translate contentKey="usersApp.fotoFoto.conteudo">Conteudo</Translate>
            </span>
          </dt>
          <dd>
            {fotoEntity.conteudo ? (
              <div>
                {fotoEntity.conteudoContentType ? (
                  <a onClick={openFile(fotoEntity.conteudoContentType, fotoEntity.conteudo)}>
                    <img src={`data:${fotoEntity.conteudoContentType};base64,${fotoEntity.conteudo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {fotoEntity.conteudoContentType}, {byteSize(fotoEntity.conteudo)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/foto" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/foto/${fotoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ foto }: IRootState) => ({
  fotoEntity: foto.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FotoDetail);
