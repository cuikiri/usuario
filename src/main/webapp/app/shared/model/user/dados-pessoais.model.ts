import { IFoto } from 'app/shared/model/foto/foto.model';
import { IFotoAvatar } from 'app/shared/model/foto/foto-avatar.model';
import { IFotoIcon } from 'app/shared/model/foto/foto-icon.model';
import { IMensagem } from 'app/shared/model/user/mensagem.model';
import { IAviso } from 'app/shared/model/user/aviso.model';
import { IDocumento } from 'app/shared/model/user/documento.model';
import { IEndereco } from 'app/shared/model/user/endereco.model';
import { IUser1 } from 'app/shared/model/user/user-1.model';
import { EstadoCivil } from 'app/shared/model/enumerations/estado-civil.model';
import { Raca } from 'app/shared/model/enumerations/raca.model';
import { Religiao } from 'app/shared/model/enumerations/religiao.model';

export interface IDadosPessoais {
  id?: number;
  nome?: string;
  sobreNome?: string;
  pai?: string;
  mae?: string;
  telefone?: string;
  celular?: string;
  whatsapp?: string;
  email?: string;
  estadoCivil?: EstadoCivil;
  raca?: Raca;
  religiao?: Religiao;
  foto?: IFoto;
  fotoAvatar?: IFotoAvatar;
  fotoIcon?: IFotoIcon;
  mensagems?: IMensagem[];
  avisos?: IAviso[];
  documentos?: IDocumento[];
  enderecos?: IEndereco[];
  user?: IUser1;
}

export const defaultValue: Readonly<IDadosPessoais> = {};
