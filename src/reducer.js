export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);

export const initialState = {
    basket: [],
    user: null,
};


function reducer(state, action) {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_WISHLIST':
            return { 
                ...state,
                basket: [...state.basket, action.item]
             };

        case 'REMOVE_FROM_WISHLIST':
            let newBasket = [...state.basket];

            const index = state.basket.findIndex((item) => item.title === action.title);

            if (index >= 0) {
                newBasket.splice(index, 1);
            }

            return { ...state, basket: newBasket };

        default:
            return state;
    }
}

export default reducer;