import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, decreaseItem } from "../utils/CartSlice";

const ItemList = ({ items, isCart = false }) => {
  if (!items || items.length === 0) return null;

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <ul className="item-list">
      {items.map((item) => {
        const itemInfo = item?.card?.info;
        const price = itemInfo?.price || itemInfo?.defaultPrice || 0;
        const cartItem = cartItems.find(
          (cartItem) => cartItem.card.info.id === itemInfo?.id
        );

        return (
          <li key={itemInfo?.id} className="menu-item">
            {/* Left Section: Food Details */}
            <div className="item-info">
              <h3>{itemInfo?.name}</h3>
              <p className="item-price">
                {price ? `₹${price / 100}` : "Price not available"}
              </p>
              <p className="item-desc">{itemInfo?.description}</p>
            </div>

            {/* Right Section: Image & Add/Remove Button */}
            <div className="item-action">
              {itemInfo?.imageId && (
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${itemInfo.imageId}`}
                  alt={itemInfo?.name}
                  className="food-img"
                />
              )}

              {cartItem ? (
                <div className="cart-controls">
                  <button
                    className="decrease-btn"
                    onClick={() => dispatch(decreaseItem(itemInfo.id))}>
                    -
                  </button>
                  <span className="item-qty">{cartItem.qty}</span>
                  <button
                    className="increase-btn"
                    onClick={() => dispatch(addItem(item))}>
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="add-btn"
                  onClick={() => dispatch(addItem(item))}>
                  ADD +
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ItemList;
