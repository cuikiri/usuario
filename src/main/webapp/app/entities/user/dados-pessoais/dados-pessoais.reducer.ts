import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDadosPessoais, defaultValue } from 'app/shared/model/user/dados-pessoais.model';

export const ACTION_TYPES = {
  FETCH_DADOSPESSOAIS_LIST: 'dadosPessoais/FETCH_DADOSPESSOAIS_LIST',
  FETCH_DADOSPESSOAIS: 'dadosPessoais/FETCH_DADOSPESSOAIS',
  CREATE_DADOSPESSOAIS: 'dadosPessoais/CREATE_DADOSPESSOAIS',
  UPDATE_DADOSPESSOAIS: 'dadosPessoais/UPDATE_DADOSPESSOAIS',
  DELETE_DADOSPESSOAIS: 'dadosPessoais/DELETE_DADOSPESSOAIS',
  RESET: 'dadosPessoais/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDadosPessoais>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type DadosPessoaisState = Readonly<typeof initialState>;

// Reducer

export default (state: DadosPessoaisState = initialState, action): DadosPessoaisState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DADOSPESSOAIS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DADOSPESSOAIS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_DADOSPESSOAIS):
    case REQUEST(ACTION_TYPES.UPDATE_DADOSPESSOAIS):
    case REQUEST(ACTION_TYPES.DELETE_DADOSPESSOAIS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DADOSPESSOAIS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DADOSPESSOAIS):
    case FAILURE(ACTION_TYPES.CREATE_DADOSPESSOAIS):
    case FAILURE(ACTION_TYPES.UPDATE_DADOSPESSOAIS):
    case FAILURE(ACTION_TYPES.DELETE_DADOSPESSOAIS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DADOSPESSOAIS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_DADOSPESSOAIS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_DADOSPESSOAIS):
    case SUCCESS(ACTION_TYPES.UPDATE_DADOSPESSOAIS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_DADOSPESSOAIS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/dados-pessoais';

// Actions

export const getEntities: ICrudGetAllAction<IDadosPessoais> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_DADOSPESSOAIS_LIST,
    payload: axios.get<IDadosPessoais>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IDadosPessoais> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DADOSPESSOAIS,
    payload: axios.get<IDadosPessoais>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IDadosPessoais> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DADOSPESSOAIS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDadosPessoais> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DADOSPESSOAIS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDadosPessoais> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DADOSPESSOAIS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
