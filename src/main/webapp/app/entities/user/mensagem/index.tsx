import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Mensagem from './mensagem';
import MensagemDetail from './mensagem-detail';
import MensagemUpdate from './mensagem-update';
import MensagemDeleteDialog from './mensagem-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MensagemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MensagemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MensagemDetail} />
      <ErrorBoundaryRoute path={match.url} component={Mensagem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MensagemDeleteDialog} />
  </>
);

export default Routes;
