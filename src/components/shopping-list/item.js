import "./index.css";
export default function ShoppingItem({ productData, updateCart ,cart}) {
  return (
    <div className="singleItem-container">
      {/* <pre>{JSON.stringify(movieData, null, 2)}</pre> */}
      <div>
        <img src={productData.largeImage} />
      </div>
      <div>
        <span>{productData.name}</span>
        {productData.sku}
        {productData.releaseDate}
        {productData.customerReviewCount}
        {productData.customerReviewAverage}
      </div>
      <div>
        {/* <span>{productData.onSale ? productData.salePrice : productData.regularPrice}</span> */}
        {/* {productData.regularPrice}
        {productData.salePrice} */}
        {/* {productData.onSale} */}
        <div>{productData.onSale ? productData.salePrice : productData.regularPrice}</div>
        <div>
          {productData.onSale && (
            <div>
              <div style={{ backgroundColor: "red", color: 'white' }}>{`save $${
                productData.regularPrice - productData.salePrice
              } `}</div>
              <div>{`reg: ${productData.regularPrice}`}</div>
            </div>
          )}
        </div>
        <button onClick={() => {
           updateCart({type:'addItemToCard', data:{sku:productData.sku,thumbnail:productData.largeImage,name:productData.name,sellingPrice: productData.onSale ? productData.salePrice : productData.regularPrice, quantity: 1, quantityLimit: productData.quantityLimit}})
        }}>ADD TO CART</button>
      </div>
    </div>
  );
}
