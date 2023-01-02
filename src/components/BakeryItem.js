// TODO: create a component that displays a single bakery item
import { fontWeight } from '@mui/system';
import { useState } from 'react';
import "./BakeryItem.css";

export default function BakeryItem(props) {
    const [count, setCount] = useState(0); 
    const item = props.itm; 
    const index = props.idx; 

    return (
            <div className='card' id="bakery-item" key={index}>
            <img src={item.image} alt=""/>
            <div className='container'>
                <div className='specs'>
                <p className='item-name'>{item.name}</p>
                ${item.price} <br/>
                <span>Type: </span>{item.type} <br/>
                <span>Dietary Restrictions: </span>{item.dietaryrestrictions.join(', ')} <br/>
                {item.description}</div>
                <br/>
                <button className="atc-button" onClick={() => props.addToCart(item)}>ADD TO CART</button>
            </div>
            </div>
        // </div>
    )
}