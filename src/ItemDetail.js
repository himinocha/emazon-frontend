import React from 'react'
import "./ItemDetail.css"
import {useParams} from "react-router-dom"

function ItemDetail(){

    let {id} = useParams();
    return (
        <div className='item_detail_container'>
            <div>
                <div className='item_detail'>
                    <img
                        className='item_detail_image'
                        src='https://github.com/yikevding/emazon/blob/main/image/sofa.jpeg?raw=true'
                    />

                    <div className='item_detail_info'>
                        <div className='item_detail_title'>
                            Classical Comfortable Grey Sofa
                        </div>

                        <div className='item_detail_rating'>
                            {Array(5)
                            .fill()
                            .map((_, i) => (
                            <p>⭐️</p>
                            ))}
                        </div>

                        <p className='item_detail_price'>
                            Price: <strong>$</strong>
                            <strong>1399.99</strong>
                        </p>

                        <div className='item_detail_description'>
                            <h4>Description</h4>
                            This is a very comfortable sofa.
                        </div>

                        <div className='item_detail_specification'>
                            <h4>Specification</h4>
                            Width: 70"<br/>
                            Height: 30"<br/>
                            Depth: 35"
                        </div>

                        <button>
                            Add to Basket
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
