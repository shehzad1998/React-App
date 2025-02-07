import React, { useState, useEffect } from "react";
import ResturantCard from "./ResturantCard";
import MENU_DATA from "../utils/Api";

const Body = () => {
    const [resdata, setResdata] = useState([...MENU_DATA]); 
    const [searchText, setSearchText] = useState("");

    const filterTopRated = () => {
        const filteredData = MENU_DATA.filter((res) => 
            parseFloat(res.info.rating?.rating_text || "0") > 4
        );
        setResdata([...filteredData]); 
    };


    return (
        <div className="body">
            <div className="filter-containerter">
                <div className="filter">
                    <button className="filter-btn" onClick={filterTopRated}>
                        Top Rated Restaurants
                    </button>
                </div>
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e)=>{
                        setSearchText(e.target.value)
                    }}/>
                    <button onClick={() => {
                        const filteredRestaurants = MENU_DATA.filter((res) => 
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setResdata(filteredRestaurants);
                    }}>
                        Search
                    </button>

                </div>
            </div>    

            <div className="res-container">
                {resdata.length > 0 ? (
                    resdata.map((Resturant) => (
                        <ResturantCard key={Resturant.info.resId} resdata={Resturant} />
                    ))
                ) : (
                    <p>No top-rated restaurants found.</p>
                )}
            </div>
        </div>
    );
};

export default Body;
