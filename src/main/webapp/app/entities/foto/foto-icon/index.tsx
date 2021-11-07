import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FotoIcon from './foto-icon';
import FotoIconDetail from './foto-icon-detail';
import FotoIconUpdate from './foto-icon-update';
import FotoIconDeleteDialog from './foto-icon-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FotoIconUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FotoIconUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FotoIconDetail} />
      <ErrorBoundaryRoute path={match.url} component={FotoIcon} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FotoIconDeleteDialog} />
  </>
);

export default Routes;
