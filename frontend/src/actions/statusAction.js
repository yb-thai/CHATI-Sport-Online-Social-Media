import {
  STATUS_LIST_REQUEST,
  STATUS_LIST_SUCCESS,
  STATUS_LIST_FAIL,
  STATUS_DETAILS_REQUEST,
  STATUS_DETAILS_SUCCESS,
  STATUS_DETAILS_FAIL,
  STATUS_CREATE_REQUEST,
  STATUS_CREATE_SUCCESS,
  STATUS_CREATE_FAIL,
  STATUS_CREATE_RESET,
  STATUS_UPDATE_REQUEST,
  STATUS_UPDATE_SUCCESS,
  STATUS_UPDATE_FAIL,
  STATUS_UPDATE_RESET,
  STATUS_DELETE_REQUEST,
  STATUS_DELETE_SUCCESS,
  STATUS_DELETE_FAIL,
  STATUS_CREATE_COMMENT_REQUEST,
  STATUS_CREATE_COMMENT_SUCCESS,
  STATUS_CREATE_COMMENT_FAIL,
  STATUS_CREATE_COMMENT_RESET,
  STATUS_LIST_OWNER_REQUEST,
  STATUS_LIST_OWNER_SUCCESS,
  STATUS_LIST_OWNER_FAIL,
} from "../constants/StatusConstant";
import axios from "axios";

export const listStatuses = () => async (dispatch) => {
  try {
    dispatch({ type: STATUS_LIST_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };
    const { data } = await axios.get(
      "http://chatispu.herokuapp.com/api/statuses/",
      config
    );

    dispatch({
      type: STATUS_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: STATUS_LIST_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    });
  }
};

export const listStatusesAccordingToOwners = (id) => async (dispatch) => {
  try {
    dispatch({ type: STATUS_LIST_OWNER_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };
    const { data } = await axios.get(
      `http://chatispu.herokuapp.com/api/status/user/${id}/`,
      config
    );

    dispatch({
      type: STATUS_LIST_OWNER_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: STATUS_LIST_OWNER_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    });
  }
};

export const listStatusDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STATUS_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };
    const { data } = await axios.get(
      `http://chatispu.herokuapp.com/api/status/${id}/`,
      config
    );

    dispatch({
      type: STATUS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: STATUS_DETAILS_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    });
  }
};

export const createStatus = (id, title, description) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STATUS_CREATE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };

    const { data } = await axios.post(
      `http://chatispu.herokuapp.com/api/status/event/${id}/`,
      { title: title, description: description },
      config
    );
    dispatch({
      type: STATUS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATUS_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateStatus = ({ id, title, description }) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STATUS_UPDATE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };

    console.log(id, title, description);
    const payload = {
      title,
      description,
    };
    const { data } = await axios.put(
      `http://chatispu.herokuapp.com/api/status/update/${id}/`,
      payload,
      config
    );
    console.log(data);
    dispatch({
      type: STATUS_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: STATUS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATUS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const deleteStatus = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STATUS_DELETE_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://chatispu.herokuapp.com/api/status/delete/${id}/`,
      config
    );

    dispatch({
      type: STATUS_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: STATUS_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const createStatusComment = (id, content) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: STATUS_CREATE_COMMENT_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };

    const { data } = await axios.post(
      `http://chatispu.herokuapp.com/api/comment/status/${id}/`,
      { content: content },
      config
    );
    dispatch({
      type: STATUS_CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STATUS_CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
