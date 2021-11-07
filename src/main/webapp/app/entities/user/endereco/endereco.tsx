import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './endereco.reducer';
import { IEndereco } from 'app/shared/model/user/endereco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IEnderecoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Endereco = (props: IEnderecoProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { enderecoList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="endereco-heading">
        <Translate contentKey="usersApp.userEndereco.home.title">Enderecos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="usersApp.userEndereco.home.createLabel">Create new Endereco</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {enderecoList && enderecoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cep')}>
                  <Translate contentKey="usersApp.userEndereco.cep">Cep</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('logradouro')}>
                  <Translate contentKey="usersApp.userEndereco.logradouro">Logradouro</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('complemento1')}>
                  <Translate contentKey="usersApp.userEndereco.complemento1">Complemento 1</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('complemento2')}>
                  <Translate contentKey="usersApp.userEndereco.complemento2">Complemento 2</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numero')}>
                  <Translate contentKey="usersApp.userEndereco.numero">Numero</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bairro')}>
                  <Translate contentKey="usersApp.userEndereco.bairro">Bairro</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('localidade')}>
                  <Translate contentKey="usersApp.userEndereco.localidade">Localidade</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('uf')}>
                  <Translate contentKey="usersApp.userEndereco.uf">Uf</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('unidade')}>
                  <Translate contentKey="usersApp.userEndereco.unidade">Unidade</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('ibge')}>
                  <Translate contentKey="usersApp.userEndereco.ibge">Ibge</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('gia')}>
                  <Translate contentKey="usersApp.userEndereco.gia">Gia</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('latitude')}>
                  <Translate contentKey="usersApp.userEndereco.latitude">Latitude</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('longitude')}>
                  <Translate contentKey="usersApp.userEndereco.longitude">Longitude</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="usersApp.userEndereco.dadosPessoais">Dados Pessoais</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {enderecoList.map((endereco, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${endereco.id}`} color="link" size="sm">
                      {endereco.id}
                    </Button>
                  </td>
                  <td>{endereco.cep}</td>
                  <td>{endereco.logradouro}</td>
                  <td>{endereco.complemento1}</td>
                  <td>{endereco.complemento2}</td>
                  <td>{endereco.numero}</td>
                  <td>{endereco.bairro}</td>
                  <td>{endereco.localidade}</td>
                  <td>{endereco.uf}</td>
                  <td>{endereco.unidade}</td>
                  <td>{endereco.ibge}</td>
                  <td>{endereco.gia}</td>
                  <td>{endereco.latitude}</td>
                  <td>{endereco.longitude}</td>
                  <td>
                    {endereco.dadosPessoais ? (
                      <Link to={`dados-pessoais/${endereco.dadosPessoais.id}`}>{endereco.dadosPessoais.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${endereco.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${endereco.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${endereco.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="usersApp.userEndereco.home.notFound">No Enderecos found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={enderecoList && enderecoList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ endereco }: IRootState) => ({
  enderecoList: endereco.entities,
  loading: endereco.loading,
  totalItems: endereco.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Endereco);
