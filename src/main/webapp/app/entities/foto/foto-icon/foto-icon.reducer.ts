import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFotoIcon, defaultValue } from 'app/shared/model/foto/foto-icon.model';

export const ACTION_TYPES = {
  FETCH_FOTOICON_LIST: 'fotoIcon/FETCH_FOTOICON_LIST',
  FETCH_FOTOICON: 'fotoIcon/FETCH_FOTOICON',
  CREATE_FOTOICON: 'fotoIcon/CREATE_FOTOICON',
  UPDATE_FOTOICON: 'fotoIcon/UPDATE_FOTOICON',
  DELETE_FOTOICON: 'fotoIcon/DELETE_FOTOICON',
  SET_BLOB: 'fotoIcon/SET_BLOB',
  RESET: 'fotoIcon/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFotoIcon>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type FotoIconState = Readonly<typeof initialState>;

// Reducer

export default (state: FotoIconState = initialState, action): FotoIconState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOTOICON_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FOTOICON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FOTOICON):
    case REQUEST(ACTION_TYPES.UPDATE_FOTOICON):
    case REQUEST(ACTION_TYPES.DELETE_FOTOICON):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FOTOICON_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FOTOICON):
    case FAILURE(ACTION_TYPES.CREATE_FOTOICON):
    case FAILURE(ACTION_TYPES.UPDATE_FOTOICON):
    case FAILURE(ACTION_TYPES.DELETE_FOTOICON):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOTOICON_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOTOICON):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FOTOICON):
    case SUCCESS(ACTION_TYPES.UPDATE_FOTOICON):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FOTOICON):
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

const apiUrl = 'api/foto-icons';

// Actions

export const getEntities: ICrudGetAllAction<IFotoIcon> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_FOTOICON_LIST,
    payload: axios.get<IFotoIcon>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IFotoIcon> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FOTOICON,
    payload: axios.get<IFotoIcon>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFotoIcon> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FOTOICON,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFotoIcon> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FOTOICON,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFotoIcon> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FOTOICON,
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
