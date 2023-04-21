import * as actionType from './actionType'

const ingredientPrice = {
    Salad: 20,
    Cheese: 30,
    Meat: 150,
}


const INIT_STATE = {
    ingredient: [
        { type: 'Salad', amount: 0 }
        , { type: 'Cheese', amount: 0 }
        , { type: 'Meat', amount: 0 }
    ]
    , orders: []
    , ordersLoading: true
    , ordersErr: false
    , totalPrice: 80
    , purchasable: false
    , token: null
    , userId: null
    , authLoading: false
    , authFailedMsg: null



}



export const reducer = (state = INIT_STATE, action) => {
    const ingredient = [...state.ingredient]

    switch (action.type) {
        case actionType.Ingredient_ADDED:

            for (let item of ingredient) {
                if (item.type === action.payload) {
                    item.amount++
                }
            }
            return {
                ...state,
                ingredient: ingredient,
                totalPrice: state.totalPrice + ingredientPrice[action.payload]
            }
        case actionType.INGREDIENT_REMOVE:

            for (let item of ingredient) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return state;
                    item.amount--
                }
            }
            return {
                ...state,
                ingredient: ingredient,
                totalPrice: state.totalPrice - ingredientPrice[action.payload]

            }

        case actionType.UPDATE_PURCHASABLE:

            let sum = state.ingredient.reduce((sum, element) => {
                return sum + element.amount
            }, 0)

            return {
                ...state,
                purchasable: sum > 0
            }
        case actionType.RESET_INGREDIENT:
            return {
                ...state,
                ingredient: [
                    { type: 'Salad', amount: 0 }
                    , { type: 'Cheese', amount: 0 }
                    , { type: 'Meat', amount: 0 }
                ]
                , totalPrice: 80
                , purchasable: false
            }

        case actionType.LOADING_ORDER:

            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                })
            }
            return {
                ...state,
                orders: orders
                , ordersLoading: false
            }


        case actionType.LOADING_ORDER_FAILD:
            return {
                ...state,
                ordersErr: true,
                ordersLoading: false
            }
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,


            }
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                authFailedMsg: null,
                token: null,
                userId: null,

            }
        case actionType.AUTH_LOADING:
            return {
                ...state,
                authFailedMsg: null,

            }
        case actionType.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload
            }



        default:
            return state
    }

}




