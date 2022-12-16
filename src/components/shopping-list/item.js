import { Modal, Popover, Rate } from "antd";
import "./index.css";
import { FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ShoppingDataContext } from ".";
export default function ShoppingItem({ productData }) {
  const { updateCart, cart } = useContext(ShoppingDataContext);

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  useEffect(() => {
    setOpen(false);
  }, [cart]);

  return (
    <div className="SKU-item">
      {/* <pre>{JSON.stringify(productData, null, 2)}</pre> */}
      <div className="singleItem-container">
        <div className="shoplist-information-img">
          <img src={productData.largeImage} alt="thumbnail" />
          <div>
            <Rate
              allowHalf
              disabled
              defaultValue={productData.customerReviewAverage}
            />
            <span className="shoplist-information-rating">
              {productData.customerReviewAverage
                ? `(${productData.customerReviewCount})`
                : "(0)"}
            </span>
          </div>
        </div>
        <div className="shoplist-information">
          <span className="shoplist-information-name">{productData.name}</span>
          <div className="shoplist-information-1">
            <div>
              <span style={{ fontWeight: "550" }}>SKU:</span>{" "}
              <span>{productData.sku}</span>
            </div>
            <div>
              <span style={{ fontWeight: "550" }}>Release Date:</span>{" "}
              {productData.releaseDate}
            </div>
          </div>

          <div className="product-plot">{productData.plot}</div>
        </div>
        <div className="shoplist-information-rsection">
          <div>
            <span className="shopping-current-price">
              $
              {productData.onSale
                ? productData.salePrice
                : productData.regularPrice}
            </span>
          </div>
          <div>
            {productData.onSale && (
              <div className="shopping-saving-price">
                <div className="item-sale-price">{`Save $${
                  productData.regularPrice - productData.salePrice
                } `}</div>
                <div className="item-before-price">{`Was: $${productData.regularPrice}`}</div>
              </div>
            )}
          </div>
          {!productData.onlineAvailability ? (
            <button
              className="shopping-addtocart-btn"
              style={{
                backgroundColor: "#c5cbd5",
                color: "#55555a",
                cursor: "not-allowed",
              }}
              disabled
            >
              Sold Out
            </button>
          ) : (
            <button
              className="shopping-addtocart-btn"
              onClick={() => {
                if (
                  productData.quantityLimit > 0 &&
                  cart.items.some(
                    (item) =>
                      item.sku === productData.sku &&
                      item.quantity === productData.quantityLimit
                  )
                ) {
                  Modal.confirm({
                    content: `Sorry, ${productData.name} is limited to ${productData.quantityLimit} per customer`,
                    centered: true,
                    closable: true,
                    maskClosable: true,
                  });
                  return;
                }

                updateCart({
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

                // productData.quantityLimit > 0 &&
                // cart.items.some(
                //   (item) =>
                //     item.sku === productData.sku &&
                //     item.quantity >= item.quantityLimit
                // )
                //   ? handleOpenChange()
                //   : updateCart({
                //       type: cart.skus.includes(productData.sku)
                //         ? "addbyOne"
                //         : "addItemToCard",
                //       data: {
                //         sku: productData.sku,
                //         thumbnail: productData.thumbnailImage,
                //         name: productData.name,
                //         sellingPrice: productData.onSale
                //           ? productData.salePrice
                //           : productData.regularPrice,
                //         quantity: 1,
                //         quantityLimit: productData.quantityLimit,
                //       },
                //     });
              }}
            >
              <FaShoppingCart />
              &nbsp;&nbsp;&nbsp;
              <span> Add to Cart</span>
            </button>
            // <Popover
            //   content={<a onClick={hide}></a>}
            //   title={`Sorry, ${productData.name} is limited to ${productData.quantityLimit} per customer`}
            //   trigger="click"
            //   open={open}
            // >

            // </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
