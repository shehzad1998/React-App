import React, { useState, useEffect } from "react";
import ResturantCard from "./ResturantCard";
import Shimmer from "./Shimmer";
const Body = () => {
    const [resdata, setResdata] = useState([]); 
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.3287285&lng=73.17773749999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
            );
            const json = await response.json();
    
            const restaurantCards = json?.data?.cards || [];
            let restaurants = [];
    
            restaurantCards.forEach((card) => {
                const foundRestaurants = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                if (foundRestaurants) {
                    restaurants.push(...foundRestaurants.map(rest => rest.info));
                }
            });

            setResdata(restaurants);
            setFilteredData(restaurants);
            setLoading(false); // Stop loading once data is fetched
        } catch (error) {
            console.error("❌ Error fetching data:", error);
            setLoading(false);
        }
    };

    const filterTopRated = () => {
        const topRated = resdata.filter(res => parseFloat(res.avgRating || "0") > 4);
        setFilteredData(topRated);
    };

    const handleSearch = () => {
        const searchResults = resdata.filter(res =>
            res.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(searchResults);
    };

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
                        <ResturantCard key={`${restaurant.id}-${index}`} resdata={restaurant} />
                    ))
                ) : (
                    <p>No restaurants found.</p>
                )}
            </div>
        </div>
    );
};

export default Body;
