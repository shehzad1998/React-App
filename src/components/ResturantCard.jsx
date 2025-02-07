import React from "react";

const ResturantCard = (props) => {
    const {resdata} = props;

    const {resId,name,Image,o2FeaturedImage, rating,cuisine,costText} = resdata?.info || {};

    const imageUrl = Image?.url || o2FeaturedImage?.url || "https://via.placeholder.com/150"; // Fallback image

    return(
       <div className="res-card">
            <div className="img-container">
                <img src={imageUrl} alt="Resturant Image" />
            </div>
           <h3>{name}</h3>
           <h4>Rating :{rating?.rating_text} Stars</h4>
           <h4>Cuisine :{cuisine[0]?.name}</h4>
           <h4>{costText?.text}</h4>
       </div>
    );   
   };

   export default ResturantCard;

