import { useContext , memo} from "react";
import { ShoppingDataContext } from ".";
import ShoppingItem from "./item";

export default memo (function ShoppingItemList({products}){
  // const { products} = useContext(ShoppingDataContext)
    
    return(
        <div className="shoppingItem-main-container">
        {products.map((product, idx) => {
          return (
            <ShoppingItem
              productData={product}
              key={idx}
            />
          );
        })}
      </div>
    )
})