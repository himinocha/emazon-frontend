import React from 'react'
import './WishlistProduct.css';
import { useStateValue } from './StateProvider';
import { Link } from "react-router-dom";

function WishlistProduct({title, image, price, rating}) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromList = () => {
        dispatch({
            type:"REMOVE_FROM_WISHLIST",
            // ideally here we should compare the id 
            title:title,
        })
    }

    const viewCurrentItem= () => {
        dispatch({
          type: 'VIEW_PRODUCT_DETAILS',
          item: {
            title: title,
            image: image,
            price: price,
            rating: rating
          }
        });
      };

  return (
    <div className='wishlistProduct'>
        <img className='wishlistProduct_image' src={image} alt=""/>

        <div className='wishlistProduct_info'>
            {/* <p className='wishlistProduct_title'>{title}</p> */}

            <Link to={`/ItemDetail/${title}/${price}/${rating}`} onClick={viewCurrentItem} style={{ textDecoration: 'none'}}>
                <p className="wishlistProduct_title">
                <strong>{title}</strong>
                </p>
            </Link>

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