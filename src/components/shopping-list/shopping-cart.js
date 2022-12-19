import { useEffect } from "react";
import { useContext } from "react";
import { ShoppingDataContext } from ".";

export default function ShoppingCart({ cartItem }) {
  const { updateCart } = useContext(ShoppingDataContext);

  useEffect(() => {
    if (cartItem.quantity === 0)
      updateCart({ type: "removeItem", data: { sku: cartItem.sku } });
  }, [cartItem.quantity]);
  
  return (
    <div className="cart-items">
      <div className="image-box">
        <img src={cartItem?.thumbnail} alt="thumbnail" />
        {/* <div>{cartItem?.sku}</div> */}
      </div>
      <div className="about-cart-item">
        <span className="cart-item-title">{cartItem.name}</span>
      </div>
      <div className="cart-item-counter">
        <button
          className="cart-item-counter-btn"
          onClick={() => {
            cartItem?.quantity > 0 &&
              updateCart({
                type: "removeByOne",
                data: {
                  sku: cartItem.sku,
                  sellingPrice: cartItem.sellingPrice,
                  quantity: cartItem.quantity,
                },
              });
          }}
        >
          -
        </button>
        <div className="cart-item-count">{cartItem?.quantity}</div>
        <button
          className="cart-item-counter-btn"
          onClick={() => {
            cartItem.quantityLimit > cartItem.quantity &&
              updateCart({
                type: "addbyOne",
                data: {
                  sku: cartItem.sku,
                  sellingPrice: cartItem.sellingPrice,
                  quantity: cartItem.quantity,
                },
              });
          }}
        >
          +
        </button>
      </div>
      <div className="cart-item-prices">
        <div className="cart-item-amount">
          {cartItem.quantity < 1
            ? ""
            : cartItem?.quantity > 1
            ? `$${cartItem.totalPrice}`
            : `$${cartItem.sellingPrice}`}
        </div>
        <div className="cart-item-remove">
          <u
            onClick={() => {
              updateCart({ type: "removeItem", data: { sku: cartItem.sku } });
            }}
          >
            Remove
          </u>
        </div>
      </div>
    </div>
  );
}
