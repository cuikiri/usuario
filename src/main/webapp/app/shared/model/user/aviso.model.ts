import { Moment } from 'moment';
import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';
import { TipoAviso } from 'app/shared/model/enumerations/tipo-aviso.model';

export interface IAviso {
  id?: number;
  data?: string;
  leitura?: string;
  titulo?: string;
  conteudo?: string;
  tipo?: TipoAviso;
  dadosPessoais?: IDadosPessoais;
}

export const defaultValue: Readonly<IAviso> = {};
