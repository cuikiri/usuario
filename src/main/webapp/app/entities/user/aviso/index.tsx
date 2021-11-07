import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Aviso from './aviso';
import AvisoDetail from './aviso-detail';
import AvisoUpdate from './aviso-update';
import AvisoDeleteDialog from './aviso-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AvisoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AvisoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AvisoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Aviso} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AvisoDeleteDialog} />
  </>
);

export default Routes;
