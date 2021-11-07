import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMensagem, defaultValue } from 'app/shared/model/user/mensagem.model';

export const ACTION_TYPES = {
  FETCH_MENSAGEM_LIST: 'mensagem/FETCH_MENSAGEM_LIST',
  FETCH_MENSAGEM: 'mensagem/FETCH_MENSAGEM',
  CREATE_MENSAGEM: 'mensagem/CREATE_MENSAGEM',
  UPDATE_MENSAGEM: 'mensagem/UPDATE_MENSAGEM',
  DELETE_MENSAGEM: 'mensagem/DELETE_MENSAGEM',
  RESET: 'mensagem/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMensagem>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type MensagemState = Readonly<typeof initialState>;

// Reducer

export default (state: MensagemState = initialState, action): MensagemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MENSAGEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MENSAGEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MENSAGEM):
    case REQUEST(ACTION_TYPES.UPDATE_MENSAGEM):
    case REQUEST(ACTION_TYPES.DELETE_MENSAGEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MENSAGEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MENSAGEM):
    case FAILURE(ACTION_TYPES.CREATE_MENSAGEM):
    case FAILURE(ACTION_TYPES.UPDATE_MENSAGEM):
    case FAILURE(ACTION_TYPES.DELETE_MENSAGEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MENSAGEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_MENSAGEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MENSAGEM):
    case SUCCESS(ACTION_TYPES.UPDATE_MENSAGEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MENSAGEM):
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

const apiUrl = 'api/mensagems';

// Actions

export const getEntities: ICrudGetAllAction<IMensagem> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MENSAGEM_LIST,
    payload: axios.get<IMensagem>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IMensagem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MENSAGEM,
    payload: axios.get<IMensagem>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMensagem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MENSAGEM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMensagem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MENSAGEM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMensagem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MENSAGEM,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
