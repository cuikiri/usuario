import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/user-1">
      <Translate contentKey="global.menu.entities.userUser1" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/dados-pessoais">
      <Translate contentKey="global.menu.entities.userDadosPessoais" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/endereco">
      <Translate contentKey="global.menu.entities.userEndereco" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/mensagem">
      <Translate contentKey="global.menu.entities.userMensagem" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/aviso">
      <Translate contentKey="global.menu.entities.userAviso" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/documento">
      <Translate contentKey="global.menu.entities.userDocumento" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/foto">
      <Translate contentKey="global.menu.entities.fotoFoto" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/foto-avatar">
      <Translate contentKey="global.menu.entities.fotoFotoAvatar" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/foto-icon">
      <Translate contentKey="global.menu.entities.fotoFotoIcon" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/foto-documento">
      <Translate contentKey="global.menu.entities.fotoFotoDocumento" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
