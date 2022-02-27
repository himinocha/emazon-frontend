import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';

function Product({ id, title, image, price, rating, specification, detail }) {

  const [{ basket }, dispatch] = useStateValue();

  const addToWishList = () => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      item: {
        title: title,
        image: image,
        price: price,
        rating: rating
      }
    });

  };
 
  return (
    <div className="product">
      <div className="product__info">
        <Link to="/ItemDetail">
          <p>{title}</p>
        </Link>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐️</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick = {addToWishList} >Add to Wish list</button>
    </div>
  );
}

export default Product;