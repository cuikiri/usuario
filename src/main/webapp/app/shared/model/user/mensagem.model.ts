import { Moment } from 'moment';
import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';
import { TipoMensagem } from 'app/shared/model/enumerations/tipo-mensagem.model';

export interface IMensagem {
  id?: number;
  data?: string;
  leitura?: string;
  titulo?: string;
  conteudo?: string;
  tipo?: TipoMensagem;
  dadosPessoais?: IDadosPessoais;
}

export const defaultValue: Readonly<IMensagem> = {};
