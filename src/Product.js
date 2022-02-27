import React from "react";
import "./Product.css";
import {Link} from "react-router-dom"

function Product({ id, title, image, price, rating, specification, detail }) {
 
  return (
    <div className="product">
      <div className="product__info">
        <Link to={`/ItemDetail/${title}/${price}/${rating}`}>
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

      <button>Add to Basket</button>
    </div>
  );
}

export default Product;