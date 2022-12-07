export default function ShoppingCart ({cart}){
    console.log(cart)
    return (
        <div>
            <div> <span>Shopping Cart</span> <button>CART ICON</button></div>
            <div>
                <div>
                    <div>as
                        <img src={cart?.thumbnail}/></div>
                    <div>SKU</div>
                </div>
                <div>
                    <div>PRODUCT NAME</div>
                    <div>QUANTITY</div>
                </div>
                <div>
                    <div>PRICE</div>
                    <button>REMOVE</button>
                </div>
            </div>
            <div>Card total:$</div>
           
        </div>
    )
}