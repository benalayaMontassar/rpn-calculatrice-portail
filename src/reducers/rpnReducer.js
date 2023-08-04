import {
    ADD_PILE_SUCCESS, ADD_PILE_FAILEURE, DELETE_PILE_SUCCESS, FETCH_PILES_FAILURE, FETCH_PILES_START, FETCH_PILES_SUCCESS,
    FETCH_OPERAND_SUCCESS, FETCH_OPERAND_FAILURE, DELETE_PILE_FAILURE, PUSH_ELEMENT_PILE_SUCCESS, PUSH_ELEMENT_PILE_FAILURE, DO_OPERATION_FAILURE, FETCH_PILE_BY_ID_SUCCESS, FETCH_PILE_BY_ID_FAILURE, DO_OPERATION_SUCCESS
} from "../actions/types";

const initialState = {
    isFetching: false, piles: [], errors: null, operand: []
};

const rpnReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PILES_START:
            return { ...state, isFetching: true };
        case FETCH_PILES_SUCCESS:
            return { piles: action.payload, isFetching: false }
        case FETCH_PILES_FAILURE:
            return { ...state, errors: action.payload, isFetching: false }
        case FETCH_OPERAND_SUCCESS:
            return { ...state, operand: action.payload }
        case FETCH_OPERAND_FAILURE:
            return { ...state, errors: action.payload }
        case ADD_PILE_SUCCESS:
            return { ...state, piles: [...state.piles, action.payload] };
        case ADD_PILE_FAILEURE:
            return { ...state };
        case DELETE_PILE_SUCCESS:
            return { ...state, piles: state.piles.filter(pile => pile.id !== action.payload) };
        case DELETE_PILE_FAILURE:
            return { ...state };
        case PUSH_ELEMENT_PILE_SUCCESS: {
            let pileToUpdate = state.piles.find(p => p.id === action.payload.idPile);
            pileToUpdate.content.push(action.payload.newValue);
            let oldElements = state.piles.filter(pile => pile.id !== action.payload);
            return oldElements?.length ? { ...state, piles: [state.piles.filter(pile => pile.id !== action.payload), pileToUpdate] } :
                { ...state, piles: [pileToUpdate] };
        }
        case PUSH_ELEMENT_PILE_FAILURE:
            return { ...state };
        case DO_OPERATION_SUCCESS: {
            let pileToUpdate = state.piles.find(p => p.id === action.payload.id);
            pileToUpdate = action.payload;
            return { ...state, piles: [state.piles.filter(pile => pile.id !== pileToUpdate.id), pileToUpdate] };
        }
        case DO_OPERATION_FAILURE:
            return { ...state };
        case FETCH_PILE_BY_ID_SUCCESS:
            return { ...state, piles: [state.piles.filter(pile => pile.id !== action.payload.id), action.payload] };
        case FETCH_PILE_BY_ID_FAILURE:
            return { ...state };
        default:
            return state;
    }

};

export default rpnReducer;