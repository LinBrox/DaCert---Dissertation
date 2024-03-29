import {
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  ADMIN_SEARCH_FAIL,
  ADMIN_SEARCH_SUCCESS,
  ADMIN_SEARCH_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../constants/userConstants'

export const userLoginReducuer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: true, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}
export const userRegisterReducuer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducuer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const adminSearchReducuer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_SEARCH_REQUEST:
      return { adminAllLoading: true }
    case ADMIN_SEARCH_SUCCESS:
      const users = action.payload
      return { adminAllLoading: false, users, success: true }
    case ADMIN_SEARCH_FAIL:
      return { adminAllLoading: false, adminError: action.payload, success: false }
    default:
      return state
  }
}

export const userDeleteReducer = (state = { loading: false, success: false }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
