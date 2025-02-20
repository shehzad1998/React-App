import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/CartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.card.info.price || item.card.info.defaultPrice || 0;
    return acc + (price / 100) * item.qty;
  }, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      <button className="ClearCart-btn" onClick={handleClearCart}>
        Clear Cart
      </button>

      {cartItems.length > 0 ? (
        <>
          <ItemList items={cartItems} isCart={true} />
          <div className="cart-total">
            <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
          </div>
        </>
      ) : (
        <p className="cart-empty">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
