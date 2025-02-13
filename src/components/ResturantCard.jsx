import React from "react";
import { Link } from "react-router-dom";

const ResturantCard = ({ resdata }) => {
    if (!resdata) return null;

    const {
        id,
        name,
        cloudinaryImageId,
        avgRating,
        cuisines,
        costForTwo,
    } = resdata;

    const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resdata.cloudinaryImageId}`;
  

    return (
        <div className="res-card">
            <div className="img-container">
                <img src={imageUrl} alt={name} />
            </div>
            <h3>{name}</h3>
            <h4>Rating: {avgRating} ⭐</h4>
            <h4>Cuisines: {cuisines?.join(", ")}</h4>
            <h4>{costForTwo}</h4>
        </div>
    );
};

export default ResturantCard;
