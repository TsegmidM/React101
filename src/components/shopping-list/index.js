import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingItem from "./item";
import "./index.css";
import { useReducer } from "react";
import ShoppingCart from "./shopping-cart";
import { FaShoppingCart } from "react-icons/fa";

const reduceCart = (currState, action) => {
  switch (action.type) {
    case "addItemToCard":
      // Object?.keys(currState).map((item) => {
      //   if (item.sku === action.data.sku){
      //     return {
      //       ...currState,
      //       quantity: item.quantity + 1,
      //       totalPrice: item.sellingPrice * (item.quantity + 1),
      //       addedSku.push(action.data.sku),
      //     }
      //   }
      // });

      if (currState.find((item) => item.sku === action.data.sku)) {
        return currState.map((item) => {
          if (item.sku === action.data.sku)
            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.sellingPrice * (item.quantity + 1),
            };
          else return item;
        });
      } else {
        return [...currState, action.data];
      }

    case "removeByOne":
      if (currState.find((item) => item.sku === action.data.sku)) {
        return currState.map((item) => {
          if (item.sku === action.data.sku)
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.sellingPrice * (item.quantity - 1),
            };
          else return item;
        });
      }
    case "addbyOne":
      if (currState.find((item) => item.sku === action.data.sku)) {
        return currState.map((item) => {
          if (item.sku === action.data.sku)
            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.sellingPrice * (item.quantity + 1),
            };
          else return item;
        });
      }
    case "removeItem":
      return currState.filter((item) => item.sku !== action.data.sku);
  }
};
export default function ShoppingList() {
  const [products, setProducts] = useState([]);
  const [cart, updateCart] = useReducer(reduceCart, []);
  const [cartTotalPrice, setCartTotalPrice] = useState();

  useEffect(() => {
    setCartTotalPrice(cart.reduce((total, item) => total + item.totalPrice, 0));
  }, [cart]);

  //const [cart, updateCart] = useReducer(reduceCart, {addedSkus:[],sku:{},cartTotal:'0});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get(
        `https://api.bestbuy.com/v1/products?format=json&show=sku,productId,name,type,regularPrice,salePrice,onSale,url,categoryPath,customerReviewAverage,customerReviewCount,department,thumbnailImage,largeImage,plot,genre,albumTitle,releaseDate,quantityLimit&apiKey=j7RQXCsGGeSc5GaXv0slAOAm`
      )
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data.products);
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
            />
          );
        })}
      </div>
      {cart.length !== 0 && (
        <div className="shoppingCard-main-container">
          <div className="customer-cart-top">
            <div className="customer-card-text">
              <h3>Shopping Cart</h3>
            </div>
            <div className="customer-card-icon-container">
              <FaShoppingCart className="customer-card-icon" />(
              {cart.reduce((total, item) => total + item.quantity, 0)})
            </div>
          </div>
          {cart.map((cart, idx) => {
            return (
              <ShoppingCart cart={cart} key={idx} updateCart={updateCart} />
            );
          })}
          <div>Card total:${parseFloat(cartTotalPrice).toFixed(2)}</div>
          {/* {cart.reduce((total, item) => total + item.totalPrice, 0)} */}
        </div>
      )}
    </div>
  );
}
