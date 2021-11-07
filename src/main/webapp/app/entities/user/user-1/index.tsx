import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import User1 from './user-1';
import User1Detail from './user-1-detail';
import User1Update from './user-1-update';
import User1DeleteDialog from './user-1-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={User1Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={User1Update} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={User1Detail} />
      <ErrorBoundaryRoute path={match.url} component={User1} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={User1DeleteDialog} />
  </>
);

export default Routes;
