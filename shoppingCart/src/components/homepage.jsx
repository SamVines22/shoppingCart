import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


const GetProducts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);
  

    useEffect(() => {
    fetch('https://fakestoreapi.com/products')
        .then((response) => 
        {
            if (response.status >= 400) {
                throw new Error("server error!");
            }
        return response.json()
        })
            .then((results)=> {
                setProducts(results);
                
            })
                .catch((err) => {
                    setError(err);
                })
                .finally(()=> {
                    setLoading(false);
                   

    }, []);
})

        return {loading, error, products }




}


const HomePage = () => {
    const {loading, error, products} = GetProducts();
    
   
    if (loading) {
         
        return (<h1>Loading......</h1>)
    }

    if (error) {

        return (<h2>Error</h2>)
    }

    if (products) {
       
    return (<>
        <h1>Welcome to my Online Shop!!</h1>
        <h2>What kind of things are you looking for?</h2>
        
        <Link to = './shop' state = {{products: products}}>Shop</Link>

        </>
    )
    }



}

export default HomePage;