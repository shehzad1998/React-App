import React, { useState, useEffect } from "react";
import ResturantCard from "./ResturantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RES_API } from "../utils/constants";

const Body = () => {
    const [resdata, setResdata] = useState([]); 
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
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
                const foundRestaurants = card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                if (foundRestaurants) {
                    restaurants.push(...foundRestaurants.map(rest => rest.info));
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
                        <Link 
                        key={`${restaurant.id}-${index}`} 
                        to={`/Resturant/${restaurant.id}`} 
                        className="res-card-link"
                    > 
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
