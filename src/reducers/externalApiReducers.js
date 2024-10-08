import {
  GET_CRICKET_MATCHES_LIST_ERROR,
  GET_CRICKET_MATCHES_LIST_REQUEST,
  GET_CRICKET_MATCHES_LIST_SUCCESS,
  GET_PLAYERS_LIST_ERROR,
  GET_PLAYERS_LIST_REQUEST,
  GET_PLAYERS_LIST_SUCCESS
} from "../constants/externalApiConstants";

export function cricketMatchesListGetReducer(state = [], action) {
  switch (action.type) {
    case GET_CRICKET_MATCHES_LIST_REQUEST:
      return { loading: true };
    case GET_CRICKET_MATCHES_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CRICKET_MATCHES_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function playersListGetReducer(state = [], action) {
  switch (action.type) {
    case GET_PLAYERS_LIST_REQUEST:
      return { loading: true };
    case GET_PLAYERS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_PLAYERS_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

