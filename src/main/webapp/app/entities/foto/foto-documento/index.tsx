import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FotoDocumento from './foto-documento';
import FotoDocumentoDetail from './foto-documento-detail';
import FotoDocumentoUpdate from './foto-documento-update';
import FotoDocumentoDeleteDialog from './foto-documento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FotoDocumentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FotoDocumentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FotoDocumentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={FotoDocumento} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FotoDocumentoDeleteDialog} />
  </>
);

export default Routes;
