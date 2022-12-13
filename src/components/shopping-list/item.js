import { Rate } from "antd";
import "./index.css";
import { FaShoppingCart } from "react-icons/fa";
export default function ShoppingItem({ productData, updateCart, cart }) {
  return (
    <div className="SKU-item">
      {/* <pre>{JSON.stringify(movieData, null, 2)}</pre> */}
      <div className="singleItem-container">
        <div className="shoplist-information-img">
          <img src={productData.largeImage} />
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
          <button
            className="shopping-addtocart-btn"
            onClick={() => {
              updateCart({
                type: "addItemToCard",
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
        </div>
      </div>
    </div>
  );
}
