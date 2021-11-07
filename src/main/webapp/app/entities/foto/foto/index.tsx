import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Foto from './foto';
import FotoDetail from './foto-detail';
import FotoUpdate from './foto-update';
import FotoDeleteDialog from './foto-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FotoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FotoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Foto} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FotoDeleteDialog} />
  </>
);

export default Routes;
