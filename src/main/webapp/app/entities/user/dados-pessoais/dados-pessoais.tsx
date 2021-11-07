import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dados-pessoais.reducer';
import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IDadosPessoaisProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DadosPessoais = (props: IDadosPessoaisProps) => {
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

  const { dadosPessoaisList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="dados-pessoais-heading">
        <Translate contentKey="usersApp.userDadosPessoais.home.title">Dados Pessoais</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="usersApp.userDadosPessoais.home.createLabel">Create new Dados Pessoais</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {dadosPessoaisList && dadosPessoaisList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nome')}>
                  <Translate contentKey="usersApp.userDadosPessoais.nome">Nome</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sobreNome')}>
                  <Translate contentKey="usersApp.userDadosPessoais.sobreNome">Sobre Nome</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('pai')}>
                  <Translate contentKey="usersApp.userDadosPessoais.pai">Pai</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mae')}>
                  <Translate contentKey="usersApp.userDadosPessoais.mae">Mae</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('telefone')}>
                  <Translate contentKey="usersApp.userDadosPessoais.telefone">Telefone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('celular')}>
                  <Translate contentKey="usersApp.userDadosPessoais.celular">Celular</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('whatsapp')}>
                  <Translate contentKey="usersApp.userDadosPessoais.whatsapp">Whatsapp</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="usersApp.userDadosPessoais.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('estadoCivil')}>
                  <Translate contentKey="usersApp.userDadosPessoais.estadoCivil">Estado Civil</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('raca')}>
                  <Translate contentKey="usersApp.userDadosPessoais.raca">Raca</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('religiao')}>
                  <Translate contentKey="usersApp.userDadosPessoais.religiao">Religiao</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="usersApp.userDadosPessoais.foto">Foto</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="usersApp.userDadosPessoais.fotoAvatar">Foto Avatar</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="usersApp.userDadosPessoais.fotoIcon">Foto Icon</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {dadosPessoaisList.map((dadosPessoais, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${dadosPessoais.id}`} color="link" size="sm">
                      {dadosPessoais.id}
                    </Button>
                  </td>
                  <td>{dadosPessoais.nome}</td>
                  <td>{dadosPessoais.sobreNome}</td>
                  <td>{dadosPessoais.pai}</td>
                  <td>{dadosPessoais.mae}</td>
                  <td>{dadosPessoais.telefone}</td>
                  <td>{dadosPessoais.celular}</td>
                  <td>{dadosPessoais.whatsapp}</td>
                  <td>{dadosPessoais.email}</td>
                  <td>
                    <Translate contentKey={`usersApp.EstadoCivil.${dadosPessoais.estadoCivil}`} />
                  </td>
                  <td>
                    <Translate contentKey={`usersApp.Raca.${dadosPessoais.raca}`} />
                  </td>
                  <td>
                    <Translate contentKey={`usersApp.Religiao.${dadosPessoais.religiao}`} />
                  </td>
                  <td>{dadosPessoais.foto ? <Link to={`foto/${dadosPessoais.foto.id}`}>{dadosPessoais.foto.id}</Link> : ''}</td>
                  <td>
                    {dadosPessoais.fotoAvatar ? (
                      <Link to={`foto-avatar/${dadosPessoais.fotoAvatar.id}`}>{dadosPessoais.fotoAvatar.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {dadosPessoais.fotoIcon ? <Link to={`foto-icon/${dadosPessoais.fotoIcon.id}`}>{dadosPessoais.fotoIcon.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${dadosPessoais.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${dadosPessoais.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${dadosPessoais.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="usersApp.userDadosPessoais.home.notFound">No Dados Pessoais found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={dadosPessoaisList && dadosPessoaisList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ dadosPessoais }: IRootState) => ({
  dadosPessoaisList: dadosPessoais.entities,
  loading: dadosPessoais.loading,
  totalItems: dadosPessoais.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DadosPessoais);
