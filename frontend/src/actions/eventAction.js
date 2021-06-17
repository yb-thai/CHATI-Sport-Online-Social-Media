import {
  EVENT_LIST_FAIL,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_REQUEST,
} from "../constants/EventConstant";
import axios from "axios";

export const listEvents = () => async (dispatch) => {
  try {
    dispatch({ type: EVENT_LIST_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${localStorage.token}`,
      },
    };
    const { data } = await axios.get(
      "http://chatispu.herokuapp.com/api/events/",
      config
    );

    dispatch({
      type: EVENT_LIST_SUCCESS,
      payload: data.results,
    });
  } catch (err) {
    dispatch({
      type: EVENT_LIST_FAIL,
      payload:
        err.response && err.response.data.detail
          ? err.response.data.detail
          : err.message,
    });
  }
};
