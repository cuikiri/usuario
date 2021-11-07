import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';

export interface IUser1 {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  dadosPessoais?: IDadosPessoais;
}

export const defaultValue: Readonly<IUser1> = {};
