import { useState, useEffect } from "react";
import { RES_API } from "./constants";

const useRestaurantCard = () => {
  const [resdata, setResdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(RES_API);
      const json = await response.json();

      const restaurantCards = json?.data?.cards || [];
      let restaurants = [];

      restaurantCards.forEach((card) => {
        const foundRestaurants =
          card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        if (foundRestaurants) {
          restaurants.push(...foundRestaurants.map((rest) => rest.info));
        }
      });

      setResdata(restaurants);
      setFilteredData(restaurants);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setLoading(false);
    }
  };
  return { resdata, filteredData, setFilteredData, loading };
};

export default useRestaurantCard;
