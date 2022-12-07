import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingItem from "./item";
import "./index.css";
import ShoppingCart from "./cart";
import { useReducer } from "react";

const reduceCart=(currState,action)=>{
   // return[...currState,{thumbnail:action.data.thumbnail}]
    return{...currState,thumbnail:action.data.thumbnail}
    
}
export default function ShoppingList() {
  const [products, setProducts] = useState([]);
  const [cart, updateCart] = useReducer(reduceCart, {});
  
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios
      .get(
        `https://api.bestbuy.com/v1/products?format=json&show=sku,productId,name,type,regularPrice,salePrice,onSale,url,categoryPath,customerReviewAverage,customerReviewCount,department,largeImage,genre,albumTitle,releaseDate&apiKey=j7RQXCsGGeSc5GaXv0slAOAm`
      )
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.products);
          console.log("HI");
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          console.error("Either your endpoint is wrong or no data found!");
        }
      })
      .finally((finallyP) => {
        console.log("request is completed!", finallyP);
      });
  };
  return (
    <div className="shoppingList-container">
      <div className="shoppingItem-main-container">
        {products.map((product, idx) => {
          return <ShoppingItem productData={product} key={idx} 
          updateCart={updateCart}/>;
        })}
      </div>
      <div className="shoppingCard-main-container">
        <ShoppingCart cart={cart}/>
      </div>
    </div>
  );
}
