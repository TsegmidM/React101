import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ShoppingDataContext } from ".";
import ShoppingCart from "./shopping-cart";

export default function ShoppingCardList() {
  const { updateCart, cart } = useContext(ShoppingDataContext);

  return (
    <div className="shoppingCard-main-container">
      <div className="customer-cart-top">
        <span className="customer-cart-heading">Shopping Cart</span>
        {/* <h5 className="customer-cart-remove-all">Remove all</h5> */}
        <div className="customer-card-icon-container">
          <div className="customer-card-icon-container">
            <FaShoppingCart className="customer-card-icon"/>
            <span className="cart-items-totalQty">{cart.totalQty}</span>
          </div>
        </div>
      </div>
      {cart?.items?.map((cartItem, idx) => {
        return (
          <ShoppingCart cartItem={cartItem} key={idx} updateCart={updateCart} />
        );
      })}
      <div className="cart-checkout">
        <div className="cart-total">
          <div>
            <div className="cart-subtotal">Sub-Total</div>
            <div className="cart-total-items">{`${cart.totalQty} items`}</div>
          </div>
          <div className="cart-total-amount">
            ${parseFloat(cart.totalAmount).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
