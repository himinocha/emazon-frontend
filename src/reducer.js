export const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);

export const initialState = {
    basket: [],
    user: null,
    currentProduct: {title:null, price:null, rating:null, image:null, userEmail:null}
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

        case 'VIEW_PRODUCT_DETAILS':
            return{
                ...state,
                currentProduct: action.item
            }
        default:
            return state;
    }
}

export default reducer;