import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Endereco from './endereco';
import EnderecoDetail from './endereco-detail';
import EnderecoUpdate from './endereco-update';
import EnderecoDeleteDialog from './endereco-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EnderecoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EnderecoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EnderecoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Endereco} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EnderecoDeleteDialog} />
  </>
);

export default Routes;
