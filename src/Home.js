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
    fetch("http://localhost:8888/api/products")
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
              />
            </div>
          ) : null}
        </div>

        <div className="home__row">
          <Product
            title="Classical Comfortable Grey Sofa"
            price={1399.99}
            rating={5}
            image="https://github.com/yikevding/emazon/blob/main/image/sofa.jpeg?raw=true"
          />
          <Product
            title="Advanced Gaming Chair"
            price={299.99}
            rating={4}
            image="https://github.com/yikevding/emazon/blob/main/image/gaming%20chair.jpeg?raw=true"
          />
        </div>

        {/* <div className="home__row">
          <Product
            title="White Marble Dinning Table"
            price={399.49}
            rating={3}
            image="https://github.com/yikevding/emazon/blob/main/image/dinning%20table.jpeg?raw=true"
          />
          <Product
            title="Stylish Nike Backpack"
            price={59.99}
            rating={5}
            image="https://github.com/yikevding/emazon/blob/main/image/bag.jpeg?raw=true"
          />
          <Product
            id="3254354345"
            title="Simple Study Desk, Home & Office Use"
            price={239.99}
            rating={4}
            image="https://github.com/yikevding/emazon/blob/main/image/study%20desk.jpeg?raw=true"
          />
        </div>

        <div className="home__row">
          <Product
            title="27 inch Advanced Monitor, 4K resolution, 144Hz"
            price={799.99}
            rating={4}
            image="https://github.com/yikevding/emazon/blob/main/image/monitor.jpeg?raw=true"
          />
        </div> */}
      </div>
    </div>
  );
}

export default Home;