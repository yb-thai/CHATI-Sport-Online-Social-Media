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
  STATUS_DELETE_RESET,
  STATUS_CREATE_COMMENT_REQUEST,
  STATUS_CREATE_COMMENT_SUCCESS,
  STATUS_CREATE_COMMENT_FAIL,
  STATUS_CREATE_COMMENT_RESET,
  STATUS_LIST_OWNER_REQUEST,
  STATUS_LIST_OWNER_SUCCESS,
  STATUS_LIST_OWNER_FAIL,
  STATUS_LIST_OWNER_RESET,
} from "../constants/StatusConstant";

export const statusListReducer = (state = { statuses: [] }, action) => {
  switch (action.type) {
    case STATUS_LIST_REQUEST:
      return { loading: true, statuses: [] };

    case STATUS_LIST_SUCCESS:
      return {
        loading: false,
        statuses: action.payload,
      };

    case STATUS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const statusListAccordingToOwnersReducer = (
  state = { statuses: [] },
  action
) => {
  switch (action.type) {
    case STATUS_LIST_OWNER_REQUEST:
      return { loading: true, statuses: [] };

    case STATUS_LIST_OWNER_SUCCESS:
      return {
        loading: false,
        statuses: action.payload,
      };

    case STATUS_LIST_OWNER_FAIL:
      return { loading: false, error: action.payload };

    case STATUS_LIST_OWNER_RESET:
      return {};
    default:
      return state;
  }
};
export const statusDetailsReducer = (
  state = { status: { comments: [] } },
  action
) => {
  switch (action.type) {
    case STATUS_DETAILS_REQUEST:
      return { loading: true, ...state };
    case STATUS_DETAILS_SUCCESS:
      return { loading: false, status: action.payload };
    case STATUS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const statusCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATUS_CREATE_REQUEST:
      return { loading: true };

    case STATUS_CREATE_SUCCESS:
      return { loading: false, success: true, status: action.payload };

    case STATUS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case STATUS_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const statusUpdateReducer = (state = { status: {} }, action) => {
  switch (action.type) {
    case STATUS_UPDATE_REQUEST:
      return { loading: true };

    case STATUS_UPDATE_SUCCESS:
      return { loading: false, success: true, status: action.payload };

    case STATUS_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case STATUS_UPDATE_RESET:
      return { status: {} };

    default:
      return state;
  }
};

export const statusDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case STATUS_DELETE_REQUEST:
      return { loading: true };

    case STATUS_DELETE_SUCCESS:
      return { loading: false, success: true };

    case STATUS_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };

    case STATUS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const statusCommentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STATUS_CREATE_COMMENT_REQUEST:
      return { loading: true };

    case STATUS_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true };

    case STATUS_CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    case STATUS_CREATE_COMMENT_RESET:
      return {};

    default:
      return state;
  }
};
