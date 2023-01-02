import "./App.css";
import { useEffect, useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from './components/BakeryItem.js';
import Navbar from './components/Navbar.js'; 
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import { fontFamily } from "@mui/system";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */
  const [cart, setCart] = useState([]); 
  const [total, setTotal] = useState(0); 
  const [filteredItems, setFilteredItems] = useState(bakeryData); 

  const [selectedTypes, setType] = useState([]);
  const [selectedRestrictions, setRestriction] = useState([]);
  const [selectedSort, setSelectedSortOption] = useState("price"); 
 
  const types = [
    "pastry", "bread", "cake", "pie"
  ];
  const restrictions = [
    "dairy free", "gluten free", "nut free"
  ];
  const sortOptions = [
    "price", "name", "type"
  ]; 

  function addToCart(item) {
    let itemExistsInCart = false; 
    const newCart = []; 
    cart.forEach(cartItem => {
      if(cartItem.name === item.name) {
        newCart.push({...cartItem, quantity: cartItem.quantity + 1});
        itemExistsInCart = true; 
      } else {
        newCart.push(cartItem); 
      }
    })
    if(!itemExistsInCart) {
      newCart.push({...item, quantity: 1}); 
    }
    console.log(total); 
    console.log(item.price); 
    console.log(item); 
    setCart(newCart);
    setTotal(total+item.price); 
  }

  function removeFromCart(item, index) {

    const newCart = []; 
    cart.forEach(cartItem => {
      if(cartItem.name === item.name && cartItem.quantity > 1) {
        newCart.push({...cartItem, quantity: cartItem.quantity - 1});
      }
      if(cartItem.name !== item.name) {
        newCart.push(cartItem); 
      }
    })
    console.log(total); 
    console.log(item.price); 
    console.log(item); 
    setCart(newCart);
    setTotal(total-item.price); 
  }

 function selectFilterType(event) {

    let newTypes = []
    
    for(var i =0; i < selectedTypes.length;  i++)
    {
      newTypes.push(selectedTypes[i]);
    }

    if(event.target.checked) {
      newTypes.push(event.target.id);
    } else {
      newTypes = selectedTypes.filter(t=>t !== event.target.id);
    }

  
    setType(newTypes);

    getFilteredItems("types", newTypes); 

  }; 





  function selectFilterRestriction(event) {

    let newRestrictions = [];

    for(var i =0; i < selectedRestrictions.length;  i++)
    {
      newRestrictions.push(selectedRestrictions[i]);
    }
    
    if(event.target.checked) {
      newRestrictions.push(event.target.id);
    } else {
      newRestrictions = selectedRestrictions.filter(r=>r !== event.target.id);
    }
    
   
    setRestriction(newRestrictions);
   
    getFilteredItems("restrictions", newRestrictions); 

  }; 



  function getFilteredItems (category, newSelections) { 

    let newFilteredItems = [];
   

    if(category === "types"){
        if(newSelections.length > 0){
          
          for(var i=0; i<bakeryData.length; i++) {
            if(newSelections.includes(bakeryData[i].type)) {
              newFilteredItems.push(bakeryData[i]); 
            }
          }; 
        }
        else{
          
          newFilteredItems = bakeryData;
        }
    }
    else if(selectedTypes.length > 0) { 
 
      for(var i=0; i<bakeryData.length; i++) {
        if(selectedTypes.includes(bakeryData[i].type)) {
          newFilteredItems.push(bakeryData[i]); 
        }
      }; 
    } 
    else{
    
      newFilteredItems = bakeryData;
    }
    
    let newRestrictedItems = [];
    

    if(category === "restrictions"){
      if(newSelections.length > 0){
        console.log("Has New Restrictions", newSelections)
        for(var i=0; i<newFilteredItems.length; i++) {
          let hasRestriction = true;
          for(var r=0; r<newSelections.length; r++) {
            if((newFilteredItems[i].dietaryrestrictions.includes(newSelections[r])) === false) {
              hasRestriction = false;
              break;
            }
          };
          if(hasRestriction === true) {
            newRestrictedItems.push(newFilteredItems[i]);
          }
        }; 
      }
      else{
        console.log("No Types")
        newRestrictedItems = newFilteredItems;
      }
    }
    else if(selectedRestrictions.length>0) { 
      
      for(var i=0; i<newFilteredItems.length; i++) {
        let hasRestriction = true;
        for(var r=0; r<selectedRestrictions.length; r++) {
          if((newFilteredItems[i].dietaryrestrictions.includes(selectedRestrictions[r])) === false) {
            hasRestriction = false;
            break;
          }
        };
        if(hasRestriction === true) {
          newRestrictedItems.push(newFilteredItems[i]);
        }
      }; 
    } 
    else{
      
      newRestrictedItems = newFilteredItems;
    }
  
    setFilteredItems(newRestrictedItems); 
    sortItems('', newRestrictedItems);
  };

  const sortItemsEvent = (event) => {
      console.log(event.target.id); 
    
      setSelectedSortOption(event.target.id);
   
    sortItems(event.target.id); 
  }


  function sortItems(sortOption, newFilterItems){
    // console.log("Existing Filter Items:", filteredItems);
    // console.log("New Filter Items:", newFilterItems);

    // console.log("Existing Sort:", selectedSort);
    // console.log("New Sort:", sortOption);

    if(sortOption === undefined){sortOption = selectedSort}

    let newSortedItems = [];
    if(newFilterItems === undefined) {
      newFilterItems = [];
      newFilterItems = filteredItems
    }

    for(var i=0; i<newFilterItems.length; i++) {
      newSortedItems.push(newFilterItems[i]); 
    }
    

    switch (sortOption) {
      case "name": 
      newSortedItems.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      break; 
      case "type": 
      newSortedItems.sort(function(a, b){
        let x = a.type.toLowerCase();
        let y = b.type.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      break; 
      case "price": 
      default: 
      newSortedItems.sort(function(a, b){
        let x = a.price;
        let y = b.price;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
      break; 
    }
    setFilteredItems(newSortedItems); 
   
  }



  return (
    <div className="App">
      <Navbar/>
      <main style={{paddingTop: "75px", marginBottom: "0"}}>
        <div className="sidebar">
          <div className="sidebar-content">
            <p className="filter-header">FILTER BY TYPE</p>
            <ul>{types.map((t) => (
              <li key={t}><Checkbox id={t} onChange={selectFilterType}/>{t}</li>
            ))}</ul>
            <p className="filter-header">FILTER BY RESTRICTION</p>
            <ul>{restrictions.map((r) => (
              <li key={r}><Checkbox id={r} onChange={selectFilterRestriction}/>{r}</li>
            ))}</ul>
            <p className="filter-header">SORT</p>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              sx={{paddingLeft: "10px"}}
            >
              {sortOptions.map((s) => (
                <FormControlLabel key={s} value={s} name="sortOptions" control={<Radio onChange={sortItemsEvent} id={s}/>} label={<Typography sx={{fontFamily: "'Roboto', sans-serif", fontWeight: "300"}}>{s}</Typography>} />
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="content">
          {filteredItems.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
            <BakeryItem itm={item} idx={index} addToCart={addToCart} />
          ))}
        </div>
        <div className="cart">
          <div className="cart-content">
          <p className="cart-header">CART</p>
        
        <ul>{cart.map((item, index) => 
          <>
            <li>
              <div className="cart-item">
                <p>{item.quantity}</p>
                <p>{item.name} </p>
                <button className="cart-button" onClick={() => removeFromCart(item, index)}><ClearIcon/></button>
              </div>
              
            </li>
          </>
        )}</ul>
        <div className="total-container">
          <span className="total">Total: </span>
          <span>${Math.abs(total).toFixed(2)}<br/></span>
        </div>
        
          </div>
        

        </div>
        

      </main>
      <footer>
          All images courtesy of Tatte Bakery. Copyright 2022. 
        </footer>
    </div>
  );
}

export default App;