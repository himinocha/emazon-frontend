import React from 'react'
import './SearchResult.css'
import { useState, useEffect } from "react";
import {Button, Layout, Radio, InputNumber, Space, Rate} from "antd";
import Product from "./Product";

const {Sider, Content } = Layout;


function SearchResult({result}){
    const [products, setProducts] = useState([])
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(9999)
    const [rating, setRating] = useState(6)

    

    useEffect(() => {
        fetch("https://emazon-backend.herokuapp.com/api/products/searchName", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: result,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setProducts(responseJson.data);
        });
    }, [result]);

    function changePrice(min, max){
        setPriceMin(min);
        setPriceMax(max);
    }

    function getMin(val){
        setPriceMin(val);
    }

    function getMax(val){
        setPriceMax(val);
    }

    // function filter(min, max, rate){

    // }

    console.log(products)

    return(
        <body className='result_page'>
        <div className="container">
            <div className="results-header">
                <span>Showing Poducts for </span>
                <span className="category">"{result}"</span>
            </div>

            <Layout>
                <Sider width="340px" theme="light" style={{ padding: "25px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>

                    <h2>
                        Condition
                    </h2>

                    <Radio.Group >
                        <Space direction="vertical">
                            <Radio value={0} onClick={()=> setRating(3)}>Used <Rate defaultValue={3} disabled={true}></Rate></Radio>
                            <Radio value={1} onClick={()=> setRating(4)}>Like New <Rate defaultValue={4} disabled={true}></Rate></Radio>
                            <Radio value={2} onClick={()=> setRating(5)}>Brand New <Rate defaultValue={5} disabled={true}></Rate></Radio>
                            <Radio value={3} onClick={()=> setRating(6)}>All</Radio>
                        </Space>
                    </Radio.Group>
                    <br/>


                    <h2>
                        Price Ranges
                    </h2>
                    <Radio.Group >
                        <Space direction="vertical">
                            <Radio value={0} onClick={()=> changePrice(0,10)}>Under $10</Radio>
                            <Radio value={1} onClick={()=> changePrice(10,50)}>$10 to $50</Radio>
                            <Radio value={2} onClick={()=> changePrice(50,100)}>$50 to $100</Radio>
                            <Radio value={3} onClick={()=> changePrice(100,200)}>$100 to $200</Radio>
                            <Radio value={4} onClick={()=> changePrice(0,99999)}>All</Radio>
                        </Space>
                    </Radio.Group>
                    <br/>
                    
                    <Space>
                        <InputNumber
                        value={priceMin}
                        formatter={value => `$${value}`}
                        onChange={(value) => changePrice(value, priceMax)}
                        />
                        <InputNumber
                        value={priceMax}
                        formatter={value => `$${value}`}
                        onChange={(value) => changePrice(priceMin, value)}
                        />
                    </Space>
                    <br/>
                    <br/>

                    {/* <Button className="button">Apply Filters</Button> */}
                </div>
                </Sider>

                <Content
                    theme="light"
                    style={{ padding: "35px", backgroundColor: "white" }}
                >
                    <h1 style={{fontSize:"30px"}}>RESULTS</h1>
                    <div>

                        {rating===6 ? <div>
                        {products.filter(product => product.price >= priceMin).filter(product => product.price <= priceMax).map((product, i) => (
                            <Product
                            title={product.name}
                            price={product.price}
                            rating={product.rating}
                            image={product.image}
                            />
                        ))}</div> : <div>
                        {products.filter(product => product.price >= priceMin).filter(product => product.price <= priceMax).filter(product => product.rating === rating).map((product, i) => (
                            <Product
                            title={product.name}
                            price={product.price}
                            rating={product.rating}
                            image={product.image}
                            />
                        ))} </div>}
                        
                    </div>
                    {/* <Product
                        title="Classical Comfortable Grey Sofa"
                        price={1399.99}
                        rating={5}
                        image="https://github.com/yikevding/emazon/blob/main/image/sofa.jpeg?raw=true"
                    /> */}
                 </Content>
            </Layout>

        
        </div>
        </body>
    )


}

export default SearchResult