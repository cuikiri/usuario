import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Documento from './documento';
import DocumentoDetail from './documento-detail';
import DocumentoUpdate from './documento-update';
import DocumentoDeleteDialog from './documento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DocumentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DocumentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DocumentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Documento} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DocumentoDeleteDialog} />
  </>
);

export default Routes;
