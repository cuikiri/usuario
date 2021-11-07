import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/user/endereco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnderecoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnderecoDetail = (props: IEnderecoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { enderecoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="usersApp.userEndereco.detail.title">Endereco</Translate> [<b>{enderecoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cep">
              <Translate contentKey="usersApp.userEndereco.cep">Cep</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.cep}</dd>
          <dt>
            <span id="logradouro">
              <Translate contentKey="usersApp.userEndereco.logradouro">Logradouro</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.logradouro}</dd>
          <dt>
            <span id="complemento1">
              <Translate contentKey="usersApp.userEndereco.complemento1">Complemento 1</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.complemento1}</dd>
          <dt>
            <span id="complemento2">
              <Translate contentKey="usersApp.userEndereco.complemento2">Complemento 2</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.complemento2}</dd>
          <dt>
            <span id="numero">
              <Translate contentKey="usersApp.userEndereco.numero">Numero</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.numero}</dd>
          <dt>
            <span id="bairro">
              <Translate contentKey="usersApp.userEndereco.bairro">Bairro</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.bairro}</dd>
          <dt>
            <span id="localidade">
              <Translate contentKey="usersApp.userEndereco.localidade">Localidade</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.localidade}</dd>
          <dt>
            <span id="uf">
              <Translate contentKey="usersApp.userEndereco.uf">Uf</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.uf}</dd>
          <dt>
            <span id="unidade">
              <Translate contentKey="usersApp.userEndereco.unidade">Unidade</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.unidade}</dd>
          <dt>
            <span id="ibge">
              <Translate contentKey="usersApp.userEndereco.ibge">Ibge</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.ibge}</dd>
          <dt>
            <span id="gia">
              <Translate contentKey="usersApp.userEndereco.gia">Gia</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.gia}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="usersApp.userEndereco.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="usersApp.userEndereco.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{enderecoEntity.longitude}</dd>
          <dt>
            <Translate contentKey="usersApp.userEndereco.dadosPessoais">Dados Pessoais</Translate>
          </dt>
          <dd>{enderecoEntity.dadosPessoais ? enderecoEntity.dadosPessoais.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/endereco" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/endereco/${enderecoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ endereco }: IRootState) => ({
  enderecoEntity: endereco.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnderecoDetail);
