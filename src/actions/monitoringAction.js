import axios from "axios";
import { GENERATE_MONITORING_PPT_FAIL, GENERATE_MONITORING_PPT_REQUEST, GENERATE_MONITORING_PPT_SUCCESS, GET_MONITORING_PPT_JOB_STATUS_FAIL, GET_MONITORING_PPT_JOB_STATUS_REQUEST, GET_MONITORING_PPT_JOB_STATUS_SUCCESS } from "../constants/monitoringConstant";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/monitoring`;

export const generateMonitoringPpt = (input) => async (dispatch, getState) => {
    dispatch({
        type: GENERATE_MONITORING_PPT_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.post(`${url}/generatePpt` , input);
        dispatch({
            type: GENERATE_MONITORING_PPT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GENERATE_MONITORING_PPT_FAIL,
            payload: {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            },
        });
    }
};

export const getMonitoringPptJobStatus = (input) => async (dispatch, getState) => {
    dispatch({
        type: GET_MONITORING_PPT_JOB_STATUS_REQUEST,
        payload: input,
    });
    try {
        const { data } = await axios.get(`${url}/jobStatus/${input.id}`);
        dispatch({
            type: GET_MONITORING_PPT_JOB_STATUS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_MONITORING_PPT_JOB_STATUS_FAIL,
            payload: {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            },
        });
    }
};