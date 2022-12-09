import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingItem from "./item";
import "./index.css";
import ShoppingCart from "./shopping-cart";
import { useReducer } from "react";

// const addQuantity = (currState, item, action)=>{
  
//   return currState.map((item) => {
//     if (item.sku === action.data.sku)
//       return { ...item, quantity: item.quantity + 1 ,price: action.data.price * item.quantity};
//     else return item;
//   });

// }

const reduceCart = (currState, action) => {
  
  switch (action.type) {
    case "addItemToCard":
      if (currState.find((item) => item.sku === action.data.sku)) {
        return currState.map((item) => {
          if (item.sku === action.data.sku)
            return { ...item, quantity: item.quantity + 1 ,totalPrice: item.sellingPrice * (item.quantity +1)};
          else return item;

        });
      } else {
        return [...currState, action.data];
      }
      
    case "removeByOne": 
      if (currState.find((item) => item.sku === action.data.sku)) {
        return currState.map((item) => {
          if (item.sku === action.data.sku)
            return { ...item, quantity: item.quantity - 1,totalPrice: item.sellingPrice * (item.quantity -1)};
          else return item;
        });
      } 
      case "addbyOne":
        if (currState.find((item) => item.sku === action.data.sku)) {
          return currState.map((item) => {
            if (item.sku === action.data.sku)
              return { ...item, quantity: item.quantity + 1,totalPrice: item.sellingPrice * (item.quantity +1)};
            else return item;
          });
        } 
   
  }
};
export default function ShoppingList() {
  const [products, setProducts] = useState([]);
  const [cart, updateCart] = useReducer(reduceCart, []);

  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(
        `https://api.bestbuy.com/v1/products?format=json&show=sku,productId,name,type,regularPrice,salePrice,onSale,url,categoryPath,customerReviewAverage,customerReviewCount,department,largeImage,plot,genre,albumTitle,releaseDate,quantityLimit&apiKey=j7RQXCsGGeSc5GaXv0slAOAm`
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
          return (
            <ShoppingItem
              productData={product}
              key={idx}
              updateCart={updateCart}
              cart={cart}
            />
          );
        })}
      </div>
      <div className="shoppingCard-main-container">
        {cart.map((cart, idx) => {
          return <ShoppingCart cart={cart} key={idx} updateCart={updateCart}/>;
        })}
      </div>
    </div>
  );
}
