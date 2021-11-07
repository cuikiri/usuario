import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAviso, defaultValue } from 'app/shared/model/user/aviso.model';

export const ACTION_TYPES = {
  FETCH_AVISO_LIST: 'aviso/FETCH_AVISO_LIST',
  FETCH_AVISO: 'aviso/FETCH_AVISO',
  CREATE_AVISO: 'aviso/CREATE_AVISO',
  UPDATE_AVISO: 'aviso/UPDATE_AVISO',
  DELETE_AVISO: 'aviso/DELETE_AVISO',
  RESET: 'aviso/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAviso>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type AvisoState = Readonly<typeof initialState>;

// Reducer

export default (state: AvisoState = initialState, action): AvisoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AVISO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AVISO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_AVISO):
    case REQUEST(ACTION_TYPES.UPDATE_AVISO):
    case REQUEST(ACTION_TYPES.DELETE_AVISO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_AVISO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AVISO):
    case FAILURE(ACTION_TYPES.CREATE_AVISO):
    case FAILURE(ACTION_TYPES.UPDATE_AVISO):
    case FAILURE(ACTION_TYPES.DELETE_AVISO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVISO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVISO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_AVISO):
    case SUCCESS(ACTION_TYPES.UPDATE_AVISO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_AVISO):
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

const apiUrl = 'api/avisos';

// Actions

export const getEntities: ICrudGetAllAction<IAviso> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_AVISO_LIST,
    payload: axios.get<IAviso>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IAviso> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AVISO,
    payload: axios.get<IAviso>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAviso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AVISO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAviso> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AVISO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAviso> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AVISO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
