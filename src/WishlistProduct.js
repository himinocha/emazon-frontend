import React from 'react'
import './WishlistProduct.css';
import { useStateValue } from './StateProvider';

function WishlistProduct({title, image, price, rating}) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromList = () => {
        dispatch({
            type:"REMOVE_FROM_WISHLIST",
            // ideally here we should compare the id 
            title:title,
        })
    }

  return (
    <div className='wishlistProduct'>
        <img className='wishlistProduct_image' src={image} alt=""/>

        <div className='wishlistProduct_info'>
            <p className='wishlistProduct_title'>{title}</p>

            <p className='wishlistProduct_price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
        <div className="wishlistProduct_rating">
            {Array(rating)
                .fill()
                .map((_, i) => (
                <p>⭐️</p>
                ))}
        </div>
            <button onClick={removeFromList}>Remove from Wish List</button>
        </div>
    </div>
  );
}

export default WishlistProduct