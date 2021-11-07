import { IFotoDocumento } from 'app/shared/model/foto/foto-documento.model';
import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';
import { TipoDocumento } from 'app/shared/model/enumerations/tipo-documento.model';

export interface IDocumento {
  id?: number;
  descricao?: string;
  tipo?: TipoDocumento;
  fotos?: IFotoDocumento[];
  dadosPessoais?: IDadosPessoais;
}

export const defaultValue: Readonly<IDocumento> = {};
