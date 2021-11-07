import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import User1 from './user/user-1';
import DadosPessoais from './user/dados-pessoais';
import Endereco from './user/endereco';
import Mensagem from './user/mensagem';
import Aviso from './user/aviso';
import Documento from './user/documento';
import Foto from './foto/foto';
import FotoAvatar from './foto/foto-avatar';
import FotoIcon from './foto/foto-icon';
import FotoDocumento from './foto/foto-documento';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}user-1`} component={User1} />
      <ErrorBoundaryRoute path={`${match.url}dados-pessoais`} component={DadosPessoais} />
      <ErrorBoundaryRoute path={`${match.url}endereco`} component={Endereco} />
      <ErrorBoundaryRoute path={`${match.url}mensagem`} component={Mensagem} />
      <ErrorBoundaryRoute path={`${match.url}aviso`} component={Aviso} />
      <ErrorBoundaryRoute path={`${match.url}documento`} component={Documento} />
      <ErrorBoundaryRoute path={`${match.url}foto`} component={Foto} />
      <ErrorBoundaryRoute path={`${match.url}foto-avatar`} component={FotoAvatar} />
      <ErrorBoundaryRoute path={`${match.url}foto-icon`} component={FotoIcon} />
      <ErrorBoundaryRoute path={`${match.url}foto-documento`} component={FotoDocumento} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
