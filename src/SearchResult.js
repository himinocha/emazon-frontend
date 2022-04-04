import React from 'react'
import './SearchResult.css'

import {Button, Layout, Radio, InputNumber, Space, Rate} from "antd";
import Product from "./Product";

const {Sider, Content } = Layout;


function SearchResult(){

    return(
        <body className='result_page'>
        <div className="container">
            <div className="results-header">
                <span>Showing Poducts for </span>
                <span className="category">"Sofa"</span>
            </div>

            <Layout>
                <Sider width="340px" theme="light" style={{ padding: "25px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>

                    <h2>
                        Condition
                    </h2>

                    <Radio.Group >
                        <Space direction="vertical">
                            <Radio value={0}>Used <Rate defaultValue={3} disabled={true}></Rate></Radio>
                            <Radio value={1}>Like New <Rate defaultValue={4} disabled={true}></Rate></Radio>
                            <Radio value={2}>Brand New <Rate defaultValue={5} disabled={true}></Rate></Radio>
                            <Radio value={3}>All</Radio>
                        </Space>
                    </Radio.Group>
                    <br/>


                    <h2>
                        Price Ranges
                    </h2>
                    <Radio.Group >
                        <Space direction="vertical">
                            <Radio value={0}>Under $10</Radio>
                            <Radio value={1}>$10 to $50</Radio>
                            <Radio value={2}>$50 to $100</Radio>
                            <Radio value={3}>$100 to $200</Radio>
                            <Radio value={4}>All</Radio>
                        </Space>
                    </Radio.Group>
                    <br/>
                    
                    <Space>
                        <InputNumber

                        />
                        <InputNumber

                        />
                    </Space>
                    <br/>
                    <br/>

                    <Button className="button">Apply Filters</Button>
                </div>
                </Sider>

                <Content
                    theme="light"
                    style={{ padding: "35px", backgroundColor: "white" }}
                >
                    <h1 style={{fontSize:"30px"}}>RESULTS</h1>
                    {/* <Results category={category} rating={rating} priceMin={priceMin} priceMax={priceMax}/> */}

                    <Product
                        title="Classical Comfortable Grey Sofa"
                        price={1399.99}
                        rating={5}
                        image="https://github.com/yikevding/emazon/blob/main/image/sofa.jpeg?raw=true"
                    />
                </Content>
            </Layout>

        
        </div>
        </body>
    )


}

export default SearchResult