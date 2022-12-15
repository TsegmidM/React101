import ShoppingItem from "./item";

export default function ShoppingItemList({products,updateCart,cart}){
    return(
        <div className="shoppingItem-main-container">
        {products.map((product, idx) => {
          return (
            <ShoppingItem
              productData={product}
              key={idx}
              updateCart={updateCart}
              cart={cart}
            />
          );
        })}
      </div>
    )
}