import axios from 'axios'
import {
  APARTMENT_LIST_REQUEST,
  APARTMENT_LIST_SUCCESS,
  APARTMENT_LIST_FAIL,
  APARTMENT_DETAILS_REQUEST,
  APARTMENT_DETAILS_SUCCESS,
  APARTMENT_DETAILS_FAIL,
  APARTMENT_DELETE_SUCCESS,
  APARTMENT_DELETE_REQUEST,
  APARTMENT_DELETE_FAIL,
  APARTMENT_CREATE_REQUEST,
  APARTMENT_CREATE_SUCCESS,
  APARTMENT_CREATE_FAIL,
  APARTMENT_UPDATE_REQUEST,
  APARTMENT_UPDATE_SUCCESS,
  APARTMENT_UPDATE_FAIL,
} from '../constants/apartmentConstants'
import { logout } from './userActions'

export const listApartments = (pageNumber = '', userFlag =false) => async (dispatch, getState) => {
    try {
      dispatch({ type: APARTMENT_LIST_REQUEST })
      
      const {
        userLogin: { userInfo },
     } = getState();

     const config = {
        headers: {
           Authorization: `Bearer ${userInfo.token}`,
        },
     };

      const { data } = await axios.get(
        `/api/apartments?pageNumber=${pageNumber}&flag=${userFlag}`, config
      )

      dispatch({
        type: APARTMENT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: APARTMENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  

  export const showApartmentDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: APARTMENT_DETAILS_REQUEST })
  
      const { data } = await axios.get(`/api/apartments/${id}`)
  
      dispatch({
        type: APARTMENT_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: APARTMENT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const deleteApartment = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APARTMENT_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/apartments/${id}`, config)
  
      dispatch({
        type: APARTMENT_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: APARTMENT_DELETE_FAIL,
        payload: message,
      })
    }
  }

  export const createApartment = (name, description, price, size, rooms, geolocation, rName, isRented) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APARTMENT_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.post(
          `/api/apartments`, 
          {name, description, price, size, rooms, geolocation, rName, isRented}, 
          config
        )
        
      dispatch({
        type: APARTMENT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: APARTMENT_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateApartment = (apartment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: APARTMENT_UPDATE_REQUEST,
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
        `/api/apartments/${apartment._id}`,
        apartment,
        config
      )
  
      dispatch({
        type: APARTMENT_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: APARTMENT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: APARTMENT_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  
  