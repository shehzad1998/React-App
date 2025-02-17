import { useParams } from "react-router-dom";
import useResturantMenu from "../utils/useResturantMenu";
import ResCatagory from "./ResCatagory";

const ResturantMenu = () => {
  const { resId } = useParams();
  const resInfo = useResturantMenu(resId);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card?.itemCards || [];
  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
        c.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    ) || [];

  console.log("itemCards:", itemCards);
  console.log("Catagory:", categories);

  return (
    <div className="Resturant-Menu">
      <h1>{name || "Loading..."}</h1>
      <p>
        {Array.isArray(cuisines) ? cuisines.join(", ") : "N/A"} -{" "}
        {costForTwoMessage || "N/A"}
      </p>
      <h2>Menu</h2>
      <ul>
        {/* {itemCards.map((item) => (
          <li key={item?.card?.info?.id}>
            {item?.card?.info?.name} -- {"RS."}
            {item?.card?.info?.price / 100 ||
              item?.card?.info?.defaultPrice / 100}
          </li>
        ))} */}

        {categories.map((category) => (
          <ResCatagory
            key={category?.card?.card?.title}
            data={category?.card?.card}
          />
        ))}
      </ul>
    </div>
  );
};

export default ResturantMenu;
