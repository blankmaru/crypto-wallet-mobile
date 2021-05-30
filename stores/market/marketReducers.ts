import * as marketActions from './marketActions';

const initialState = {
    myHoldings: [],
    coins: [],
    error: null,
    loading: false
}

const marketReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case marketActions.GET_HOLDINGS_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActions.GET_HOLDINGS_SUCCESS:
            return {
                ...state,
                myHoldings: action.payload.myHoldings
            }
        case marketActions.GET_HOLDINGS_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        case marketActions.GET_COIN_BEGIN:
            return {
                ...state,
                loading: true
            }
        case marketActions.GET_COIN_SUCCESS:
            return {
                ...state,
                coins: action.payload.coins
            }
        case marketActions.GET_COIN_FAILURE:
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state;
    }
}

export default marketReducer;