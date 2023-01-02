import { useState } from 'react';

export default function TypeButton(props) {
    const type = props.type; 
    const index = props.idx; 

    return (
        <div key={index}>
            <button onClick={() => props.addToCart(item)}>Add to cart</button>
            <h2>{item.name} {item.price}</h2>
        </div>
    )
}