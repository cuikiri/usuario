import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './dados-pessoais.reducer';
import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDadosPessoaisDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DadosPessoaisDetail = (props: IDadosPessoaisDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { dadosPessoaisEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.userDadosPessoais.detail.title">DadosPessoais</Translate> [<b>{dadosPessoaisEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nome">
              <Translate contentKey="usersApp.userDadosPessoais.nome">Nome</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.nome}</dd>
          <dt>
            <span id="sobreNome">
              <Translate contentKey="usersApp.userDadosPessoais.sobreNome">Sobre Nome</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.sobreNome}</dd>
          <dt>
            <span id="pai">
              <Translate contentKey="usersApp.userDadosPessoais.pai">Pai</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.pai}</dd>
          <dt>
            <span id="mae">
              <Translate contentKey="usersApp.userDadosPessoais.mae">Mae</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.mae}</dd>
          <dt>
            <span id="telefone">
              <Translate contentKey="usersApp.userDadosPessoais.telefone">Telefone</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.telefone}</dd>
          <dt>
            <span id="celular">
              <Translate contentKey="usersApp.userDadosPessoais.celular">Celular</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.celular}</dd>
          <dt>
            <span id="whatsapp">
              <Translate contentKey="usersApp.userDadosPessoais.whatsapp">Whatsapp</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.whatsapp}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="usersApp.userDadosPessoais.email">Email</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.email}</dd>
          <dt>
            <span id="estadoCivil">
              <Translate contentKey="usersApp.userDadosPessoais.estadoCivil">Estado Civil</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.estadoCivil}</dd>
          <dt>
            <span id="raca">
              <Translate contentKey="usersApp.userDadosPessoais.raca">Raca</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.raca}</dd>
          <dt>
            <span id="religiao">
              <Translate contentKey="usersApp.userDadosPessoais.religiao">Religiao</Translate>
            </span>
          </dt>
          <dd>{dadosPessoaisEntity.religiao}</dd>
          <dt>
            <Translate contentKey="usersApp.userDadosPessoais.foto">Foto</Translate>
          </dt>
          <dd>{dadosPessoaisEntity.foto ? dadosPessoaisEntity.foto.id : ''}</dd>
          <dt>
            <Translate contentKey="usersApp.userDadosPessoais.fotoAvatar">Foto Avatar</Translate>
          </dt>
          <dd>{dadosPessoaisEntity.fotoAvatar ? dadosPessoaisEntity.fotoAvatar.id : ''}</dd>
          <dt>
            <Translate contentKey="usersApp.userDadosPessoais.fotoIcon">Foto Icon</Translate>
          </dt>
          <dd>{dadosPessoaisEntity.fotoIcon ? dadosPessoaisEntity.fotoIcon.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/dados-pessoais" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dados-pessoais/${dadosPessoaisEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ dadosPessoais }: IRootState) => ({
  dadosPessoaisEntity: dadosPessoais.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DadosPessoaisDetail);
