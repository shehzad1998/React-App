const ItemList = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <ul className="item-list">
      {items.map((item) => {
        const itemInfo = item?.card?.info;
        return (
          <li key={itemInfo?.id} className="menu-item">
            {/* Left Section: Food Details */}
            <div className="item-info">
              <h3>{itemInfo?.name}</h3>
              <p className="item-price">
                {itemInfo?.price ? `₹${itemInfo.price / 100}` : ""}
              </p>
              <p className="item-desc">{itemInfo?.description}</p>
            </div>

            {/* Right Section: Image & Add Button */}
            <div className="item-action">
              {itemInfo?.imageId && (
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${itemInfo.imageId}`}
                  alt={itemInfo?.name}
                  className="food-img"
                />
              )}
              <button className="add-btn">ADD</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ItemList;
