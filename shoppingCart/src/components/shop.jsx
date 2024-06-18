import { useLocation, Link } from "react-router-dom";
import {useState} from 'react';

const Shop = () => {
    const [cart, updateCart] = useState([]);
    const location = useLocation();
    const {products} = location.state;
   // const [prod, setProd] = useState(products);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(null);
    

    function addCart(id) {
    console.log(id);
    const prod = products.filter((item)=> item.id == id);
    const qty = quantity.filter((item)=> item.item == id);
    let quant = parseInt(qty[0].quantity);
    let price = parseFloat(prod[0].price*quant).toFixed(2);
    let copy = cart;
    let tot;
    if (cart.length == 0)
    { 
      updateCart([...cart, {item: prod[0], quantity: quant, price: price}]);
      setTotal(price);
      
    }
    else {
      for (let x =0; x < cart.length; x++)
      {
        if (copy[x].item.id == id)
        {
          console.log("GIMP");
          copy[x].quantity = cart[x].quantity + quant;
          console.log(copy[x].quantity);
          price = parseFloat(copy[x].quantity * prod[0].price).toFixed(2);
          console.log(price);
          copy[x].price = price;
          updateCart(copy);
          tot = (parseFloat(price)).toFixed(2);
          setTotal(tot);
          return;
        }
      }
      updateCart([...cart, {item: prod[0], quantity: quant, price: price}]);
    
    tot = (parseFloat(price) + parseFloat(total)).toFixed(2);
    setTotal(tot);
    }
  }

    function getQuantity(e, id) {
    
        let quant = e.target.value;
        if (!quantity)
        {
          setQuantity([{item: id, quantity: quant}])
        }
        else {
        let copy = quantity;
        for (let x = 0; x < quantity.length; x++)
        {
          if (copy[x].item == id)
          {
            copy[x].quantity = quant;
            setQuantity(copy);
            return;
          }
        }
        setQuantity([...quantity, {item: id, quantity: e.target.value}]);
       
      }

    }

   

   
    

    return (<>
        <h1>Shop</h1>
        <Link to = '/'>home</Link>
            {cart && <div id = "basket">
            <ul>
                {
                cart.map((item) => {
                  
                  return (
                    <li key = {item.item.id + "basket"}>
                    Product: {item.item.title} Quantity: {item.quantity} Unit Cost: {item.item.price}  Total Cost: ${item.price}
                    </li>
                  )
                  
                })
              
              }
          
            </ul>
            Total Price: ${total}
            <button>Proceed to Checkout</button>
            </div>}
            
            {    
                products.map((item)=> {
                  return(  
                
                  <div key = {item.id} className="productDiv">
                    <div>{item.title}</div> 
                    <input type = "number" onChange = {(e)=>getQuantity(e,item.id)} ></input>
                    <div><img src = {item.image}></img></div>
                    <button onClick = {()=>addCart(item.id)}>add</button>
                  </div>
                  
            
                  )
                })
            }
     

    
    </>)
}

export default Shop;


