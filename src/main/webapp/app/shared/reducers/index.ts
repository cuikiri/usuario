import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import user1, {
  User1State
} from 'app/entities/user/user-1/user-1.reducer';
// prettier-ignore
import dadosPessoais, {
  DadosPessoaisState
} from 'app/entities/user/dados-pessoais/dados-pessoais.reducer';
// prettier-ignore
import endereco, {
  EnderecoState
} from 'app/entities/user/endereco/endereco.reducer';
// prettier-ignore
import mensagem, {
  MensagemState
} from 'app/entities/user/mensagem/mensagem.reducer';
// prettier-ignore
import aviso, {
  AvisoState
} from 'app/entities/user/aviso/aviso.reducer';
// prettier-ignore
import documento, {
  DocumentoState
} from 'app/entities/user/documento/documento.reducer';
// prettier-ignore
import foto, {
  FotoState
} from 'app/entities/foto/foto/foto.reducer';
// prettier-ignore
import fotoAvatar, {
  FotoAvatarState
} from 'app/entities/foto/foto-avatar/foto-avatar.reducer';
// prettier-ignore
import fotoIcon, {
  FotoIconState
} from 'app/entities/foto/foto-icon/foto-icon.reducer';
// prettier-ignore
import fotoDocumento, {
  FotoDocumentoState
} from 'app/entities/foto/foto-documento/foto-documento.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly user1: User1State;
  readonly dadosPessoais: DadosPessoaisState;
  readonly endereco: EnderecoState;
  readonly mensagem: MensagemState;
  readonly aviso: AvisoState;
  readonly documento: DocumentoState;
  readonly foto: FotoState;
  readonly fotoAvatar: FotoAvatarState;
  readonly fotoIcon: FotoIconState;
  readonly fotoDocumento: FotoDocumentoState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  user1,
  dadosPessoais,
  endereco,
  mensagem,
  aviso,
  documento,
  foto,
  fotoAvatar,
  fotoIcon,
  fotoDocumento,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
