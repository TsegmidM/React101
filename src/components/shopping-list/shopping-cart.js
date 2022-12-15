export default function ShoppingCart({ cart, updateCart }) {
  return (
    <div>
      <div>
        <img src={cart?.thumbnail} alt="thumbnail" />
      </div>
      <div>{cart?.sku}</div>
      <div>
        <div>{cart.name}</div>
        <div>
          {cart?.quantity}
          <button
            onClick={() => {
              cart.quantityLimit > cart.quantity &&
                updateCart({
                  type: "addbyOne",
                  data: {
                    sku: cart.sku,
                    sellingPrice: cart.sellingPrice,
                    quantity: cart.quantity,
                  },
                });
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              cart?.quantity > 0 &&
                updateCart({
                  type: "removeByOne",
                  data: {
                    sku: cart.sku,
                    sellingPrice: cart.sellingPrice,
                    quantity: cart.quantity,
                  },
                });
            }}
          >
            -
          </button>
        </div>
      </div>
      <div>
        <div>
          {cart.quantity < 1
            ? ""
            : cart?.quantity > 1
            ? `$${cart.totalPrice}`
            : `$${cart.sellingPrice}`}
        </div>
        <button
          onClick={() => {
            updateCart({ type: "removeItem", data: { sku: cart.sku } });
          }}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
}
