import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "./shopping-cart";

export default function ShoppingCardList({ cart, updateCart }) {
  return (
    <div className="shoppingCard-main-container">
      <div className="customer-cart-top">
        <div className="customer-card-text">
          <h3>Shopping Cart</h3>
        </div>
        <div className="customer-card-icon-container">
          <FaShoppingCart className="customer-card-icon" />({cart.totalQty})
        </div>
      </div>
      {cart?.items?.map((cart, idx) => {
        return <ShoppingCart cart={cart} key={idx} updateCart={updateCart} />;
      })}
      <div>Card total:${parseFloat(cart.totalAmount).toFixed(2)}</div>
      {/* {cart.items.reduce((total, item) => total + item.totalPrice, 0)} */}
    </div>
  );
}
