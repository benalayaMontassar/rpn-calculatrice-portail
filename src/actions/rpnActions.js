import axios from "axios";
import {
    FETCH_PILES_START, FETCH_PILES_SUCCESS,
    FETCH_PILES_FAILURE, ADD_PILE_SUCCESS, ADD_PILE_FAILEURE, DELETE_PILE_SUCCESS,
    DELETE_PILE_FAILURE, FETCH_OPERAND_SUCCESS, FETCH_OPERAND_FAILURE, PUSH_ELEMENT_PILE_SUCCESS, PUSH_ELEMENT_PILE_FAILURE,
    FETCH_PILE_BY_ID_SUCCESS, FETCH_PILE_BY_ID_FAILURE, DO_OPERATION_SUCCESS, DO_OPERATION_FAILURE
} from "./types";

const URL = `http://localhost:8080/rpn/`;

export const fetchPiles = () => {
    return (dispatch) => {
        dispatch({
            type: FETCH_PILES_START
        });
        axios(URL + 'stack', {
            method: "GET",
            headers: {
                'content-type': 'application/json',
            }
        }).then(response => dispatch({
            type: FETCH_PILES_SUCCESS, payload: response.data
        })).catch(error => dispatch({
            type: FETCH_PILES_FAILURE, payload: error
        }));
    }
};


export const fetchOperand = () => {
    return (dispatch) => {
        axios(URL + 'op', {
            method: "GET",
            headers: {
                'content-type': 'application/json',
            }
        }).then(response => dispatch({
            type: FETCH_OPERAND_SUCCESS, payload: response.data
        })).catch(error => dispatch({
            type: FETCH_OPERAND_FAILURE, payload: error
        }));
    }
};

export const addPile = pile => {
    return (dispatch) => {
        axios.post(URL + 'stack', pile).then(() => dispatch({
            type: ADD_PILE_SUCCESS, payload: pile
        })).catch(error => dispatch({
            type: ADD_PILE_FAILEURE, payload: error
        }));
    }
};

export const deletePile = idPile => {
    return (dispatch) => {
        axios.delete(URL + 'stack/' + idPile).then(() => dispatch({
            type: DELETE_PILE_SUCCESS, payload: idPile
        })).catch(error => dispatch({
            type: DELETE_PILE_FAILURE, payload: error
        }));
    }
};


export const pushELementByPile = (idPile, newValue) => {
    return (dispatch) => {
        axios.post(URL + 'stack/' + idPile, { 'newValue': newValue }).then(() => dispatch({
            type: PUSH_ELEMENT_PILE_SUCCESS, payload: { idPile: idPile, newValue: newValue }
        })).catch(error => dispatch({
            type: PUSH_ELEMENT_PILE_FAILURE, payload: error
        }));
    }
};


export const doOperation = (idPile, idOperand) => {
    return (dispatch) => {
        axios.post(URL + 'op/' + idOperand + '/stack/' + idPile).then((response) =>
            dispatch({
                type: DO_OPERATION_SUCCESS, payload: response.data
            })).catch(error => dispatch({
                type: DO_OPERATION_FAILURE, payload: error
            }));
    }
};

export const getPileById = (idPile) => {
    return (dispatch) => {
        axios.get(URL + 'stack/' + idPile).then((response) => dispatch({
            type: FETCH_PILE_BY_ID_SUCCESS, payload: response.data
        })).catch(error => dispatch({
            type: FETCH_PILE_BY_ID_FAILURE, payload: error
        }));
    }
};
