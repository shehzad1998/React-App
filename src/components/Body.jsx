import React, { useState } from "react";
import ResturantCard from "./ResturantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurantCard from "../utils/useRestaurantCard";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const { resdata, filteredData, setFilteredData, loading } =
    useRestaurantCard();

  const filterTopRated = () => {
    const topRated = resdata.filter(
      (res) => parseFloat(res.avgRating || "0") > 4
    );
    setFilteredData(topRated);
  };

  const handleSearch = () => {
    const searchResults = resdata.filter((res) =>
      res.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(searchResults);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return <h1>Opps! Your Internet Connection is not working!</h1>;
  return (
    <div className="body">
      <div className="filter-container">
        <div className="filter">
          <button className="filter-btn" onClick={filterTopRated}>
            Top Rated Restaurants
          </button>
        </div>
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="res-container">
        {loading ? (
          <Shimmer />
        ) : filteredData.length > 0 ? (
          filteredData.map((restaurant, index) => (
            <Link
              key={`${restaurant.id}-${index}`}
              to={`/Resturant/${restaurant.id}`}
              className="res-card-link">
              <ResturantCard resdata={restaurant} />
            </Link>
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
