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


  async function deleteProduct(event) {
      event.preventDefault()

      const response = await fetch('https://emazon-backend.herokuapp.com/api/products/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              _id: id
          }),
      })
      const data = await response.json()

      console.log(data);
      window.location.reload();
	}

 
  return (
    <div className="product">
      <div className="product__info">
        <Link to={`/ItemDetail/${title}/${price}/${rating}`} onClick={viewCurrentItem} style={{ textDecoration: 'none'}}>
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

      <button onClick = {deleteProduct} >Delete</button>
    </div>
  );
}

export default Product;