import "./index.css";
export default function ShoppingItem({ productData, updateCart }) {
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
        {productData.regularPrice}
        {productData.salePrice}
        {productData.onSale}
        <button onClick={() => {
            updateCart({type:'addItemToCard', data:{thumbnail:productData.largeImage}})
        }}>ADD TO CART</button>
      </div>
    </div>
  );
}
