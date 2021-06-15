import axios from "axios";
import {
   USER_REGISTER_FAIL,
   USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS,
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_DETAILS_FAIL,
   USER_DETAILS_REQUEST,
   USER_DETAILS_SUCCESS,
   USER_DETAILS_RESET,
   USER_UPDATE_FAIL,
   USER_UPDATE_REQUEST,
   USER_UPDATE_SUCCESS,
   USER_LIST_FAIL_ADMIN,
   USER_LIST_SUCCESS_ADMIN,
   USER_LIST_REQUEST_ADMIN,
   USER_LIST_RESET_ADMIN,
   USER_DELETE_REQUEST_ADMIN,
   USER_DELETE_SUCCESS_ADMIN,
   USER_DELETE_FAIL_ADMIN,
   USER_UPDATE_SUCCESS_ADMIN,
   USER_UPDATE_REQUEST_ADMIN,
   USER_UPDATE_FAIL_ADMIN,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_LOGIN_REQUEST,
      });

      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const { data } = await axios.post(
         "/api/users/login",
         { email, password },
         config
      );

      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const logout = () => (dispatch) => {
   localStorage.removeItem("userInfo");
   dispatch({ type: USER_LOGOUT });
   dispatch({ type: USER_DETAILS_RESET });
   dispatch({ type: USER_LIST_RESET_ADMIN });
   document.location.href = "/login";
};

export const register = (name, email, password) => async (dispatch) => {
   try {
      dispatch({
         type: USER_REGISTER_REQUEST,
      });

      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      };

      const { data } = await axios.post(
         "/api/users",
         { name, email, password },
         config
      );

      dispatch({
         type: USER_REGISTER_SUCCESS,
         payload: data,
      });

      // dispatch({
      //    type: USER_LOGIN_SUCCESS,
      //    payload: data,
      // });

      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      dispatch({
         type: USER_REGISTER_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DETAILS_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      let p = id;
      if (id === "profile") p = userInfo._id;
      const { data } = await axios.get(`/api/users/${p}`, config);

      dispatch({
         type: USER_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (message === "Not authorized, token failed") {
         dispatch(logout());
      }
      dispatch({
         type: USER_DETAILS_FAIL,
         payload: message,
      });
   }
};

export const updateUser = (user) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_UPDATE_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch({
         type: USER_UPDATE_SUCCESS,
         payload: data,
      });
      dispatch({
         type: USER_LOGIN_SUCCESS,
         payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (message === "Not authorized, token failed") {
         dispatch(logout());
      }
      dispatch({
         type: USER_UPDATE_FAIL,
         payload: message,
      });
   }
};

export const listUsersAdmin = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_LIST_REQUEST_ADMIN,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/users`, config);

      dispatch({
         type: USER_LIST_SUCCESS_ADMIN,
         payload: data,
      });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (message === "Not authorized, token failed") {
         dispatch(logout());
      }
      dispatch({
         type: USER_LIST_FAIL_ADMIN,
         payload: message,
      });
   }
};

export const deleteUserAdmin = (id) => async (dispatch, getState) => {
   try {
      dispatch({
         type: USER_DELETE_REQUEST_ADMIN,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      await axios.delete(`/api/users/${id}`, config);

      dispatch({ type: USER_DELETE_SUCCESS_ADMIN });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (message === "Not authorized, token failed") {
         dispatch(logout());
      }
      dispatch({
         type: USER_DELETE_FAIL_ADMIN,
         payload: message,
      });
   }
};

export const updateUserAdmin = ({ id, name, email, isRealtor,isAdmin }) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: USER_UPDATE_REQUEST_ADMIN,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      console.log(id);

      const { data } = await axios.put(
         `/api/users/${id}`,
         { name, email, isRealtor, isAdmin },
         config
      );

      dispatch({ type: USER_UPDATE_SUCCESS_ADMIN });

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

      dispatch({ type: USER_DETAILS_RESET });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (message === "Not authorized, token failed") {
         dispatch(logout());
      }
      dispatch({
         type: USER_UPDATE_FAIL_ADMIN,
         payload: message,
      });
   }
};
