import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { color } from "@mui/system";

function Product({ id, title, image, price, rating, specification, detail, userEmail }) {

  const [{ basket }, dispatch] = useStateValue();

  const addToWishList = () => {
    dispatch({
      type: 'ADD_TO_WISHLIST',
      item: {
        title: title,
        image: image,
        price: price,
        rating: rating,
        userEmail: userEmail
      }
    });

  };
  const viewCurrentItem= () => {
    dispatch({
      type: 'VIEW_PRODUCT_DETAILS',
      item: {
        title: title,
        image: image,
        price: price,
        rating: rating,
        userEmail: userEmail
      }
    });
  };


 
  return (
    <div className="product">
      <div className="product__info">
        <Link to={`/ItemDetail/${title}/${price}/${rating}`} onClick={viewCurrentItem} style={{ textDecoration: 'none'}}>
        <p className="product__title">
          <strong>{title}</strong>
        </p>
        </Link>
        
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐️</p>
            ))}
        </div>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>

      <img src={image} alt="" />

      <button onClick = {addToWishList} >Add to Wishlist</button>
    </div>
  );
}

export default Product;