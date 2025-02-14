import { useParams } from "react-router-dom";
import useResturantMenu from "../utils/useResturantMenu";

const ResturantMenu = () => {
  const { resId } = useParams();
  const resInfo = useResturantMenu(resId);

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card?.itemCards || [];

  console.log("itemCards:", itemCards);

  return (
    <div className="Resturant-Menu">
      <h1>{name || "Loading..."}</h1>
      <p>
        {Array.isArray(cuisines) ? cuisines.join(", ") : "N/A"} -{" "}
        {costForTwoMessage || "N/A"}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.map((item) => (
          <li key={item?.card?.info?.id}>
            {item?.card?.info?.name} -- {"RS."}
            {item?.card?.info?.price / 100 ||
              item?.card?.info?.defaultPrice / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResturantMenu;
