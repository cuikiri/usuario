import { IDocumento } from 'app/shared/model/user/documento.model';

export interface IFotoDocumento {
  id?: number;
  conteudoContentType?: string;
  conteudo?: any;
  documento?: IDocumento;
}

export const defaultValue: Readonly<IFotoDocumento> = {};
