import { Popover, Rate } from "antd";
import "./index.css";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
export default function ShoppingItem({ productData, updateCart, cart }) {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <div className="SKU-item">
      {/* <pre>{JSON.stringify(movieData, null, 2)}</pre> */}
      <div className="singleItem-container">
        <div className="shoplist-information-img">
          <img src={productData.largeImage} alt="thumbnail" />
        </div>
        <div className="shoplist-information">
          <h5>{productData.name}</h5>
          <div className="shoplist-information-1">
            SKU:{productData.sku}
            Release Date: {productData.releaseDate}
          </div>
          <div>
            <Rate
              allowHalf
              disabled
              defaultValue={productData.customerReviewAverage}
            />
            ({productData.customerReviewCount})
          </div>
          <div className="product-plot">{productData.plot}</div>
        </div>
        <div className="shoplist-information-rsection">
          {/* <span>{productData.onSale ? productData.salePrice : productData.regularPrice}</span> */}
          {/* {productData.regularPrice}
        {productData.salePrice} */}
          {/* {productData.onSale} */}
          <div>
            <h2>
              $
              {productData.onSale
                ? productData.salePrice
                : productData.regularPrice}
            </h2>
          </div>
          <div>
            {productData.onSale && (
              <div>
                <div
                  style={{ backgroundColor: "red", color: "white" }}
                >{`save $${
                  productData.regularPrice - productData.salePrice
                } `}</div>
                <div>{`reg: ${productData.regularPrice}`}</div>
              </div>
            )}
          </div>
          <Popover
          content={<a onClick={hide}>Close</a>}
          title={`Sorry, ${productData.name} is limited to ${productData.quantityLimit} per customer`}
          trigger="click"
          open={open}
          // onOpenChange={handleOpenChange}
          >
          <button
            className="shopping-addtocart-btn"
            onClick={() => {
              productData.quantityLimit > 0 &&
              cart.items.some(
                (item) =>
                  item.sku === productData.sku &&
                  item.quantity >= item.quantityLimit
              )
                ? handleOpenChange()
                : updateCart({
                    type: cart.skus.includes(productData.sku)
                      ? "addbyOne"
                      : "addItemToCard",
                    data: {
                      sku: productData.sku,
                      thumbnail: productData.thumbnailImage,
                      name: productData.name,
                      sellingPrice: productData.onSale
                        ? productData.salePrice
                        : productData.regularPrice,
                      quantity: 1,
                      quantityLimit: productData.quantityLimit,
                    },
                  });
            }}
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
          </Popover>
        </div>
      </div>
    </div>
  );
}
