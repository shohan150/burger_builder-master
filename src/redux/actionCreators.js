import * as actionType from './actionType'
import axios from 'axios'




export const ingredient_added = igtype => {
    return {
        type: actionType.Ingredient_ADDED,
        payload: igtype
    }
}

export const ingredient_remove = igtype => {
    return {
        type: actionType.INGREDIENT_REMOVE,
        payload: igtype
    }
}


export const update_purchasable = () => {
    return {
        type: actionType.UPDATE_PURCHASABLE
    }
}

export const reset_ingredient = () => {
    return {
        type: actionType.RESET_INGREDIENT
    }
}


export const loading_order = orders => {
    return {
        type: actionType.LOADING_ORDER,
        payload: orders
    }
}


export const loading_order_faild = () => {
    return {
        type: actionType.LOADING_ORDER_FAILD
    }
}

export const fetchloadingOrder = (token, userId) => dispatch => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';

    axios.get('https://burger-builder-2af17-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)

        .then(response => {
            dispatch(loading_order(response.data))
        })
        .catch(error => dispatch(loading_order_faild()))
}