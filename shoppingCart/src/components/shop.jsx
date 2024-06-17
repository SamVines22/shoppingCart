import { useLocation, Link } from "react-router-dom";
import {useState} from 'react';



const Shop = () => {
    const [cart, updateCart] = useState([]);
    const location = useLocation();
    const {products} = location.state;
    const [total, setTotal] = useState(0);


    const [quantity, setQuantity] = useState([{item: null, quantity: 0}]);

    function addCart(id) {
      console.log(id);
     const prod = products.filter((item)=> item.id == id);
      updateCart([...cart, prod[0]]);
      const price = (prod[0].price).toFixed(2);
      const newTotal = parseFloat(total) + parseFloat(price); 
      setTotal(newTotal);
      
    }

    function getQuantity(e, id) {
        let quant = e.target.value;
        setQuantity([...quantity, {item: id, quantity: e.target.value}]);
        console.log(quant);
        console.log(id);
        console.log(quantity);
        displayQuan(quant, id);

    }

    function displayQuan (quan, id) {
        console.log(quan, id)

    }
   

   
    

    return (<>
        <h1>Shop</h1>
        <Link to = '/'>home</Link>
            {cart.length != 0 && <div id = "basket">
            <ul>
                {
                cart.map((item) => {
                  
                  return (
                    <li key = {item.id + "basket"}>
                    {item.title}:  ${item.price}
                    </li>
                  )
                  
                })
              
              }
          
            </ul>
            Total Price: ${total}
            </div>}
            
            {    
                products.map((item)=> {
                  return(  
                
                  <div key = {item.id} className="productDiv">
                    <div>{item.title}</div> 
                    <input type = "number" onChange = {(e)=>getQuantity(e,item.id)} value = {item.quantity}></input>
                    <div><img src = {item.image}></img></div>
                    <button onClick = {()=>addCart(item.id)}>add</button>
                  </div>
                  
            
                  )
                })
            }
     

    
    </>)
}

export default Shop;


