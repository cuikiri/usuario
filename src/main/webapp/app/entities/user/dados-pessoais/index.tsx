import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DadosPessoais from './dados-pessoais';
import DadosPessoaisDetail from './dados-pessoais-detail';
import DadosPessoaisUpdate from './dados-pessoais-update';
import DadosPessoaisDeleteDialog from './dados-pessoais-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DadosPessoaisUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DadosPessoaisUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DadosPessoaisDetail} />
      <ErrorBoundaryRoute path={match.url} component={DadosPessoais} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DadosPessoaisDeleteDialog} />
  </>
);

export default Routes;
