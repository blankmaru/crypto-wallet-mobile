import axios, {AxiosError, AxiosResponse} from "axios";
import {Dispatch} from "redux";

export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE";
export const GET_COIN_BEGIN = "GET_COIN_BEGIN";
export const GET_COIN_SUCCESS = "GET_COIN_SUCCESS";
export const GET_COIN_FAILURE = "GET_COIN_FAILURE";

export const getHoldingsBegin = () => ({
    type: GET_HOLDINGS_BEGIN
})

export const getHoldingsSuccess = (holdings: any) => ({
    type: GET_HOLDINGS_SUCCESS,
    payload: {holdings}
})

export const getHoldingsFailure = (error: any) => ({
    type: GET_HOLDINGS_FAILURE,
    payload: {error}
})

export function getHoldings(holdings = [], currency = 'usd', orderBy = 'market_cap_desc',
                            sparkline = true, priceChangePerc = '7d',
                            perPage = 10, page = 1) {
    return (dispatch: Dispatch) => {
        dispatch(getHoldingsBegin())

        let ids = holdings.map((item: any) => { return item.id }).join(",");

        let apiURL = `https://api.coingecko.com/api/v3/coins/markets?
        vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&
        price_change_percentage=${priceChangePerc}&ids=${ids}`;

        return axios({
            url: apiURL,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((res: AxiosResponse) => {
            if (res.status == 200) {
                let myHoldings = res.data.map((item: any) => {
                    let coin: any = holdings.find((a: any) => a.id == item.id);

                    let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)

                    return {
                        id: item.id,
                        symbol: item.symbol,
                        name: item.name,
                        image: item.image,
                        current_price: item.current_price,
                        qty: item.qty,
                        total: coin.qty * item.current_price,
                        price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                        holding_value_change_7d: (item.current_price - price7d) * coin.qty,
                        sparkline_in_7d: {
                            value: item.sparkline_in_7d.price.map((price: any) => {
                                return price * coin.qty
                            })
                        }
                    }
                })

                dispatch(getHoldingsSuccess(myHoldings));
            } else {
                dispatch(getHoldingsFailure(res.data));
            }
        }).catch((err: AxiosError) => {
            dispatch(getHoldingsFailure(err));
        })
    }
}

export const getCoinMarketBegin = () => ({
    type: GET_COIN_BEGIN
})

export const getCoinMarketSuccess = (coins: any) => ({
    type: GET_COIN_SUCCESS,
    payload: {coins}
})

export const getCoinMarketFailure = (error: any) => ({
    type: GET_COIN_FAILURE,
    payload: {error}
})

export function getCoinMarket(currency = 'usd', orderBy = 'market_cap_desc',
                              sparkline = true, priceChangePerc = '7d',
                              perPage = 10, page = 1) {
    return (dispatch: Dispatch) => {
        dispatch(getCoinMarketBegin());

        let apiURL = `https://api.coingecko.com/api/v3/coins/markets?
        vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&
        price_change_percentage=${priceChangePerc}`;

        return axios({
            url: apiURL,
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((res: AxiosResponse) => {
            if (res.status == 200) {
                dispatch(getCoinMarketSuccess(res.data));
            } else {
                dispatch(getCoinMarketFailure(res.data));
            }
        }).catch((err: AxiosError) => {
            dispatch(getCoinMarketFailure(err));
        })
    }
}