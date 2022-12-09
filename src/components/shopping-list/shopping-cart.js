import { CartesianGrid } from "recharts"

export default function ShoppingCart ({cart,updateCart}){
   // console.log(cart)
    return (
        <div>
                    <div>
                        <img src={cart?.thumbnail}/></div>
                    <div>{cart?.sku}</div>
                <div>
                    <div>{cart.name}</div>
                    <div>{cart?.quantity}
                    <button onClick={()=>{
                       cart.quantityLimit > cart.quantity &&  updateCart({type:"addbyOne", data:{sku: cart.sku,sellingPrice:cart.price,quantity:cart.quantity}})         }}>+</button>
                    <button onClick={()=>{
                       cart?.quantity > 0 && updateCart({type:"removeByOne", data:{sku: cart.sku,sellingPrice:cart.price,quantity:cart.quantity}})
                    }}>-</button>
                    </div>
                </div>
                <div>
                    <div>${cart.quantity<1 ? "" : cart?.quantity > 1 ? cart.totalPrice :cart.sellingPrice }</div>
                    <button onClick={()=>{
                        updateCart({type:"removeItem", data:{sku:cart.sku}})
                    }}>REMOVE</button>
                </div>
        </div>
    )
}