import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFotoAvatar, defaultValue } from 'app/shared/model/foto/foto-avatar.model';

export const ACTION_TYPES = {
  FETCH_FOTOAVATAR_LIST: 'fotoAvatar/FETCH_FOTOAVATAR_LIST',
  FETCH_FOTOAVATAR: 'fotoAvatar/FETCH_FOTOAVATAR',
  CREATE_FOTOAVATAR: 'fotoAvatar/CREATE_FOTOAVATAR',
  UPDATE_FOTOAVATAR: 'fotoAvatar/UPDATE_FOTOAVATAR',
  DELETE_FOTOAVATAR: 'fotoAvatar/DELETE_FOTOAVATAR',
  SET_BLOB: 'fotoAvatar/SET_BLOB',
  RESET: 'fotoAvatar/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFotoAvatar>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type FotoAvatarState = Readonly<typeof initialState>;

// Reducer

export default (state: FotoAvatarState = initialState, action): FotoAvatarState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOTOAVATAR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOTOAVATAR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FOTOAVATAR):
    case REQUEST(ACTION_TYPES.UPDATE_FOTOAVATAR):
    case REQUEST(ACTION_TYPES.DELETE_FOTOAVATAR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FOTOAVATAR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOTOAVATAR):
    case FAILURE(ACTION_TYPES.CREATE_FOTOAVATAR):
    case FAILURE(ACTION_TYPES.UPDATE_FOTOAVATAR):
    case FAILURE(ACTION_TYPES.DELETE_FOTOAVATAR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOTOAVATAR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOTOAVATAR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOTOAVATAR):
    case SUCCESS(ACTION_TYPES.UPDATE_FOTOAVATAR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOTOAVATAR):
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

const apiUrl = 'api/foto-avatars';

// Actions

export const getEntities: ICrudGetAllAction<IFotoAvatar> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FOTOAVATAR_LIST,
    payload: axios.get<IFotoAvatar>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IFotoAvatar> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOTOAVATAR,
    payload: axios.get<IFotoAvatar>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFotoAvatar> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOTOAVATAR,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFotoAvatar> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOTOAVATAR,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFotoAvatar> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOTOAVATAR,
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
