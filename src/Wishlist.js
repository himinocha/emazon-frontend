import React from 'react';
import './Wishlist.css';
import WishlistProduct from './WishlistProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Wishlist() {

    const [{ basket }] = useStateValue();

    return (
    <div className="wishlist">
        <div className='wishlist_left'>
        {basket?.length === 0 ? (
            <div>
                <div class = "header-bottom"></div>
                <h2>Your Wish List is Empty!</h2>
                <p>You have nothing in your wish list. To add items to your wish list, click on 'Add to Wish List'</p>
            </div>
        ) :
        (
            <div>
                <div class = "header-bottom"></div>
                <h2>Your Wish List</h2>
                {basket?.map(item => (
                    <WishlistProduct
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        )}
        </div>    
        {basket.length > 0 && (
            <div className='wishlist_right'>
                <Subtotal/>
            </div>
        )}
    </div>
    )
}


export default Wishlist