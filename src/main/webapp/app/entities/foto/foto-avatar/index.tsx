import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FotoAvatar from './foto-avatar';
import FotoAvatarDetail from './foto-avatar-detail';
import FotoAvatarUpdate from './foto-avatar-update';
import FotoAvatarDeleteDialog from './foto-avatar-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FotoAvatarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FotoAvatarUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FotoAvatarDetail} />
      <ErrorBoundaryRoute path={match.url} component={FotoAvatar} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FotoAvatarDeleteDialog} />
  </>
);

export default Routes;
