import React from 'react'
import "./ItemDetail.css"
import {useParams} from "react-router-dom"
import { useStateValue } from './StateProvider';
import { Link } from "react-router-dom";

function ItemDetail(){

    let {title, price, rating} = useParams();

    const [{ currentProduct }] = useStateValue();

    console.log("currentProduct", currentProduct);
    
    
    const renderContent = () => {
        if (currentProduct.title == null) {
          return (
            <h2 >Return to home page to view items</h2>
          );     
        }
        else {
          return (
    
            <>
                <img
                        className='item_detail_image'
                        src={currentProduct.image}
                    />

                    <div className='item_detail_info'>
                        <div className='item_detail_title'>
                            {currentProduct.title}
                        </div>

                        <div className='item_detail_rating'>
                            {Array(parseInt(currentProduct.rating))
                            .fill()
                            .map((_, i) => (
                            <p>⭐️</p>
                            ))}
                        </div>

                        <p className='item_detail_price'>
                            Price: <strong>$</strong>
                            <strong>{currentProduct.price}</strong>
                        </p>

                        <div className='item_detail_description'>
                            <h4>Description</h4>
                            Enter item description here.
                        </div>

                        <div className='item_detail_specification'>
                            <h4>Specification</h4>
                            Width: 70"<br/>
                            Height: 30"<br/>
                            Depth: 35"
                        </div>

                        <button>
                            Add to Wishlist
                        </button>

                        <Link to ='/DirectChatPage'>
                            <button>
                                Chat
                            </button>
                        </Link>
                    </div>
            </>
          );
        }
      }


    return (
        <div className='item_detail_container'>
            <div>
                <div className='item_detail'>
                    {renderContent()}
                    
                </div>
            </div>
        </div>
    )
}

export default ItemDetail