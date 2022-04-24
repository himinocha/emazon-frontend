import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { Link } from "react-router-dom";

function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();

  return (
    <div className='subtotal'>
        <CurrencyFormat
            renderText={(value) => (
                <>
                <p>
                    Subtotal ({basket.length} items): <strong>{` ${value}`}</strong>
                </p>
                </>
            )}  
             decimalScale={2}
             value={getBasketTotal(basket)}
             displayType={"text"}
             thousandSeparator={true}
             prefix={"$"}
        />


        <Link to ='/DirectChatPage'>
          <button id="chat">Proceed to Chat</button>          
        </Link>
    </div>
  );
}

export default Subtotal