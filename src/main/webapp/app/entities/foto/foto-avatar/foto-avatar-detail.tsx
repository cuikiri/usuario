import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './foto-avatar.reducer';
import { IFotoAvatar } from 'app/shared/model/foto/foto-avatar.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFotoAvatarDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FotoAvatarDetail = (props: IFotoAvatarDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fotoAvatarEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.fotoFotoAvatar.detail.title">FotoAvatar</Translate> [<b>{fotoAvatarEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="conteudo">
              <Translate contentKey="usersApp.fotoFotoAvatar.conteudo">Conteudo</Translate>
            </span>
          </dt>
          <dd>
            {fotoAvatarEntity.conteudo ? (
              <div>
                {fotoAvatarEntity.conteudoContentType ? (
                  <a onClick={openFile(fotoAvatarEntity.conteudoContentType, fotoAvatarEntity.conteudo)}>
                    <img
                      src={`data:${fotoAvatarEntity.conteudoContentType};base64,${fotoAvatarEntity.conteudo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {fotoAvatarEntity.conteudoContentType}, {byteSize(fotoAvatarEntity.conteudo)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/foto-avatar" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/foto-avatar/${fotoAvatarEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fotoAvatar }: IRootState) => ({
  fotoAvatarEntity: fotoAvatar.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FotoAvatarDetail);
