import axios from 'axios'
import {
  CERT_LIST_FAIL,
  CERT_LIST_REQUEST,
  CERT_LIST_SUCCESS,
  CERT_CREATE_REQUEST,
  CERT_CREATE_SUCCESS,
  CERT_CREATE_FAIL,
  CERT_UPDATE_FAIL,
  CERT_UPDATE_SUCCESS,
  CERT_UPDATE_REQUEST,
  CERT_DELETE_REQUEST,
  CERT_DELETE_SUCCESS,
  CERT_DELETE_FAIL,
} from '../constants/certsConstants'

export const listCerts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERT_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/certs', config)
    dispatch({
      type: CERT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.message
        ? error.response.data.message
        : error.message
    console.log(message)
    dispatch({
      type: CERT_LIST_FAIL,
      payload: message,
    })
  }
}
export const createCertAction = (name, title, date, hash, logo) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: CERT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/certs/create`,
      { name, title, date, hash, logo },
      config,
    )

    dispatch({
      type: CERT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CERT_CREATE_FAIL,
      payload: message,
    })
  }
}
export const deleteCertAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CERT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/certs/${id}`, config);

    dispatch({
      type: CERT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CERT_DELETE_FAIL,
      payload: message,
    });
  }
};
export const updateCertAction = (id, name, title, date, hash, logo) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch({
      type: CERT_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/certs/${id}`,
      { name, title, date, hash, logo },
      config,
    )

    dispatch({
      type: CERT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: CERT_UPDATE_FAIL,
      payload: message,
    })
  }
}
