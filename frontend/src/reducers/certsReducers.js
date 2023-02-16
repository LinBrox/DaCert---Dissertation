import {
  CERT_LIST_FAIL,
  CERT_LIST_REQUEST,
  CERT_LIST_SUCCESS,
  CERT_CREATE_REQUEST,
  CERT_CREATE_SUCCESS,
  CERT_CREATE_FAIL,
  CERT_UPDATE_REQUEST,
  CERT_UPDATE_SUCCESS,
  CERT_UPDATE_FAIL,
  CERT_DELETE_REQUEST,
  CERT_DELETE_SUCCESS,
  CERT_DELETE_FAIL,
} from '../constants/certsConstants'

export const certListReducuer = (state = { certs: [] }, action) => {
  switch (action.type) {
    case CERT_LIST_REQUEST:
      return { loading: true }
    case CERT_LIST_SUCCESS:
      return { loading: false, certs: action.payload }
    case CERT_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const certCreateReducuer = (state = {}, action) => {
  switch (action.type) {
    case CERT_CREATE_REQUEST:
      return { loading: true }
    case CERT_CREATE_SUCCESS:
      return { loading: false, success: true }
    case CERT_CREATE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const certUpdateReducuer = (state = {}, action) => {
  switch (action.type) {
    case CERT_UPDATE_REQUEST:
      return { loading: true }
    case CERT_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case CERT_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

export const certDeleteReducuer = (state = {}, action) => {
  switch (action.type) {
    case CERT_DELETE_REQUEST:
      return { loading: true }
    case CERT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CERT_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false }

    default:
      return state
  }
}

