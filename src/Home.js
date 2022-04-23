// BE on Server
// http://emazon-backend.herokuapp.com/api/products

// BE on local
// http://localhost:8888/api/products

import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import axios from 'axios';

function Home() {
  const [list, setList] = useState(true);
  const [card, setCard] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch("https://emazon-backend.herokuapp.com/api/products")
      .then((response) => response.json())
      .then((responseJson) => {
        setProducts(responseJson.data);
      });
  }, []);
  
  let showCard = (id) => {
    fetch(`https://emazon-backend.herokuapp.com/api/products/${id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setProduct(responseJson.data);
        setList(false);
        setCard(true);
      });
  };
  
  let showList = () => {
    setCard(false);
    setList(true);
  };

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://github.com/yikevding/emazon/blob/main/emory.jpeg?raw=true"
          alt=""
        />
        <div className="container">
          {list ? (
            <div className="home__row">
              {products.map((product, i) => (
                <Product
                  title={product.name}
                  price={product.price}
                  rating={product.rating}
                  image={product.image}
                  userEmail={product.userEmail}
                />
              ))}
            </div>
          ) : null}
          {card ? (
            <div class="home__row">
              <Product
                title={product.name}
                price={product.price}
                rating={product.rating}
                image={product.image}
                userEmail={product.userEmail}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;