import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mensagem.reducer';
import { IMensagem } from 'app/shared/model/user/mensagem.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMensagemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MensagemDetail = (props: IMensagemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { mensagemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.userMensagem.detail.title">Mensagem</Translate> [<b>{mensagemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="data">
              <Translate contentKey="usersApp.userMensagem.data">Data</Translate>
            </span>
          </dt>
          <dd>{mensagemEntity.data ? <TextFormat value={mensagemEntity.data} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="leitura">
              <Translate contentKey="usersApp.userMensagem.leitura">Leitura</Translate>
            </span>
          </dt>
          <dd>{mensagemEntity.leitura ? <TextFormat value={mensagemEntity.leitura} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="titulo">
              <Translate contentKey="usersApp.userMensagem.titulo">Titulo</Translate>
            </span>
          </dt>
          <dd>{mensagemEntity.titulo}</dd>
          <dt>
            <span id="conteudo">
              <Translate contentKey="usersApp.userMensagem.conteudo">Conteudo</Translate>
            </span>
          </dt>
          <dd>{mensagemEntity.conteudo}</dd>
          <dt>
            <span id="tipo">
              <Translate contentKey="usersApp.userMensagem.tipo">Tipo</Translate>
            </span>
          </dt>
          <dd>{mensagemEntity.tipo}</dd>
          <dt>
            <Translate contentKey="usersApp.userMensagem.dadosPessoais">Dados Pessoais</Translate>
          </dt>
          <dd>{mensagemEntity.dadosPessoais ? mensagemEntity.dadosPessoais.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/mensagem" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/mensagem/${mensagemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ mensagem }: IRootState) => ({
  mensagemEntity: mensagem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MensagemDetail);
