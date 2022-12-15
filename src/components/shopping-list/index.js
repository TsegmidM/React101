import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingItem from "./item";
import "./index.css";
import { useReducer } from "react";
import ShoppingCardList from "./shopping-cart-list";
import ShoppingItemList from "./item-list";

const reduceCart = (currState, action) => {
  switch (action.type) {
    case "addItemToCard":
      return {
        items: [
          ...currState.items,
          {
            ...action.data,
            quantity: 1,
            totalPrice: action.data.sellingPrice,
          },
        ],
        totalQty: currState.totalQty + 1,
        totalAmount: currState.totalAmount + action.data.sellingPrice,
        skus: [...currState.skus, action.data.sku],
      };
    case "addbyOne":
      return {
        ...currState,
        items: currState.items.map((item) => {
          if (item.sku === action.data.sku) {
            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.sellingPrice * (item.quantity + 1),
            };
          } else {
            return item;
          }
        }),
        totalQty: currState.totalQty + 1,
        totalAmount: currState.totalAmount + action.data.sellingPrice,
      };
    case "removeByOne":
      return {
        ...currState,
        items: currState.items.map((item) => {
          if (item.sku === action.data.sku) {
            return {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.sellingPrice * (item.quantity - 1),
            };
          } else {
            return item;
          }
        }),
        totalQty: currState.totalQty - 1,
        totalAmount: currState.totalAmount - action.data.sellingPrice,
      };

    case "removeItem":
      const itemToRemove = currState.items.find((item) => item.sku === action.data.sku);
      return {
        ...currState,
        items: currState.items.filter((item) => item.sku !== action.data.sku),
        skus: currState.skus.filter((sku) => sku !== action.data.sku),
        totalQty: currState.totalQty - itemToRemove.quantity,
        totalAmount: currState.totalAmount - itemToRemove.totalPrice,
      };
    default:
      window.alert("Error");
  }
};
export default function ShoppingList() {
  const [products, setProducts] = useState([]);
  const [cart, updateCart] = useReducer(reduceCart, {
    items: [],
    totalQty: 0,
    totalAmount: 0,
    skus: [],
  });
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
      <ShoppingItemList
        products={products}
        cart={cart}
        updateCart={updateCart}
      />
      {cart?.items?.length !== 0 && (
        <ShoppingCardList cart={cart} updateCart={updateCart} />
      )}
    </div>
  );
}
