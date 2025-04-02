import axios from "axios";

import {
  GET_CRICKET_MATCHES_LIST_ERROR,
  GET_CRICKET_MATCHES_LIST_REQUEST,
  GET_CRICKET_MATCHES_LIST_SUCCESS,
  GET_PLAYERS_LIST_REQUEST,
  GET_PLAYERS_LIST_SUCCESS,
} from "../constants/externalApiConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/screens`;

export const getCricketMatchesList = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CRICKET_MATCHES_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}/cricketMatchesList`);
    dispatch({
      type: GET_CRICKET_MATCHES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CRICKET_MATCHES_LIST_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    })
  }
}


export const getPlayersList = ({ id }) => async (dispatch, getState) => {
  dispatch({
    type: GET_PLAYERS_LIST_REQUEST,
    payload: { id },
  });
  try {
    const { data } = await axios.get(`${url}/matchPlayersList?id=${id}`);
    // const data = [
    //   {
    //     label: "Virat Kohli",
    //     value: "virat kohli",
    //   },{
    //     label: "Rohit Sharma",
    //     value: "rohit sharma",
    //   },{
    //     label: "Surya Kumar Yadav",
    //     value: "surya kumar yadav"
    //   },{
    //     label: "Jasprit Bumrah",
    //     value: "jasprit bumrah",
    //   },{
    //     label: "Hardik Pandya",
    //     value: "hardik pandya"
    //   }];
      
    dispatch({
      type: GET_PLAYERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PLAYERS_LIST_ERROR,
      payload: error,
    })
  }
}