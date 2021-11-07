import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFoto, defaultValue } from 'app/shared/model/foto/foto.model';

export const ACTION_TYPES = {
  FETCH_FOTO_LIST: 'foto/FETCH_FOTO_LIST',
  FETCH_FOTO: 'foto/FETCH_FOTO',
  CREATE_FOTO: 'foto/CREATE_FOTO',
  UPDATE_FOTO: 'foto/UPDATE_FOTO',
  DELETE_FOTO: 'foto/DELETE_FOTO',
  SET_BLOB: 'foto/SET_BLOB',
  RESET: 'foto/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFoto>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type FotoState = Readonly<typeof initialState>;

// Reducer

export default (state: FotoState = initialState, action): FotoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOTO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FOTO):
    case REQUEST(ACTION_TYPES.UPDATE_FOTO):
    case REQUEST(ACTION_TYPES.DELETE_FOTO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FOTO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOTO):
    case FAILURE(ACTION_TYPES.CREATE_FOTO):
    case FAILURE(ACTION_TYPES.UPDATE_FOTO):
    case FAILURE(ACTION_TYPES.DELETE_FOTO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOTO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOTO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOTO):
    case SUCCESS(ACTION_TYPES.UPDATE_FOTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOTO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/fotos';

// Actions

export const getEntities: ICrudGetAllAction<IFoto> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FOTO_LIST,
    payload: axios.get<IFoto>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IFoto> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOTO,
    payload: axios.get<IFoto>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFoto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOTO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFoto> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOTO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFoto> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOTO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
