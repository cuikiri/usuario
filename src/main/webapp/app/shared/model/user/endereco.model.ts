import { IDadosPessoais } from 'app/shared/model/user/dados-pessoais.model';

export interface IEndereco {
  id?: number;
  cep?: string;
  logradouro?: string;
  complemento1?: string;
  complemento2?: string;
  numero?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  unidade?: string;
  ibge?: string;
  gia?: string;
  latitude?: number;
  longitude?: number;
  dadosPessoais?: IDadosPessoais;
}

export const defaultValue: Readonly<IEndereco> = {};
