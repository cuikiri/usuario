import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUser1, defaultValue } from 'app/shared/model/user/user-1.model';

export const ACTION_TYPES = {
  FETCH_USER1_LIST: 'user1/FETCH_USER1_LIST',
  FETCH_USER1: 'user1/FETCH_USER1',
  CREATE_USER1: 'user1/CREATE_USER1',
  UPDATE_USER1: 'user1/UPDATE_USER1',
  DELETE_USER1: 'user1/DELETE_USER1',
  RESET: 'user1/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUser1>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type User1State = Readonly<typeof initialState>;

// Reducer

export default (state: User1State = initialState, action): User1State => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USER1_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USER1):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USER1):
    case REQUEST(ACTION_TYPES.UPDATE_USER1):
    case REQUEST(ACTION_TYPES.DELETE_USER1):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USER1_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USER1):
    case FAILURE(ACTION_TYPES.CREATE_USER1):
    case FAILURE(ACTION_TYPES.UPDATE_USER1):
    case FAILURE(ACTION_TYPES.DELETE_USER1):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USER1_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_USER1):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USER1):
    case SUCCESS(ACTION_TYPES.UPDATE_USER1):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USER1):
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

const apiUrl = 'api/user-1-s';

// Actions

export const getEntities: ICrudGetAllAction<IUser1> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USER1_LIST,
    payload: axios.get<IUser1>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IUser1> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USER1,
    payload: axios.get<IUser1>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUser1> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USER1,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUser1> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USER1,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUser1> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USER1,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
