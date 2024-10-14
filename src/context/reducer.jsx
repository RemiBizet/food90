export const actionType = {
    SET_LOGIN_SHOW : 'SET_LOGIN_SHOW',
    SET_LOGIN_SUCCESS : 'SET_LOGIN_SUCCESS',
    SET_LOGOUT : 'SET_LOGOUT',
    SET_CART_ITEMS : 'SET_CART_ITEMS',
    SET_CLEAN_CART: 'SET_CLEAN_CART',
    SET_CONFIRM_ORDER_SHOW : 'SET_CONFIRM_ORDER_SHOW',
    SET_CART_SHOW : 'SET_CART_SHOW'
}

/* Reducer to modify states */

const reducer = (state, action) => {
    switch(action.type){
        case actionType.SET_LOGIN_SHOW:
            return{
                ...state,
                loginShow : action.loginShow,
            };
        case actionType.SET_LOGIN_SUCCESS:
            return {
                ...state,
                user: {
                    username: action.payload.username
                },
            };
        case actionType.SET_LOGOUT:
            return {
                ...state,
                user: null,
                cartItems : []
            };
        case actionType.SET_CLEAN_CART:
                return{
                    ...state,
                    cartItems : [],
                };
        case actionType.SET_CART_ITEMS:
            return{
                ...state,
                cartItems : action.payload.items,
            };
        case actionType.SET_CART_SHOW:
            return{
                ...state,
                cartShow : action.cartShow,
            };
        case actionType.SET_CONFIRM_ORDER_SHOW:
            return {
                ...state,
                confirmOrderShow: action.confirmOrderShow
            };
        default:
            return state;
    }
}

export default reducer;