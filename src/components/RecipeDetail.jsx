import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
//const API_KEY = "7ed3e5b46aa04b2796715359f5b8c170";
import "../index.css";

const RecipeDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState([]);
    useEffect(() => {
      const getRecipeDetail = async () => {
        const details = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}`
        );
        const detailsJson = await details.json();
        console.log(detailsJson);
        if (detailsJson != null)
            setFullDetails(detailsJson);
        else {
            alert("No output yet!");
            console.log("Error!");
        }
        };
        getRecipeDetail().catch(console.error);
        }, []);
    //console.log(detailsJson);
    console.log(fullDetails);
    return (

     <>
      {(fullDetails) ? 
        <div className="details-intro">
            <h1>{fullDetails.title}</h1>
            <img
            className="images"
            src={fullDetails.image}
            alt={`Small icon for ${params.id} recipe`}
            />
            <div> {fullDetails.summary}</div>
            <br></br>
            <div>
            This dish provides{" "}
            {fullDetails.servings}{" servings."}
            </div>
            <p> Breakdown: </p>
            <table className="details-table" style={{backgroundColor: "tan", color: "maroon", marginRight: "auto" , marginLeft: "auto"}}>
                <tbody>
                    <tr>
                        <th>Ready Time</th>
                        <td>{fullDetails.readyInMinutes}</td>
                    </tr>
                    <tr>
                        <th>Health Score</th>
                        <td>{fullDetails.healthScore}</td>
                    </tr>
                    <tr>
                        <th>Dairy Free?</th>
                        <td>{(fullDetails.dairyFree) ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th>Gluten Free?</th>
                        <td>{(fullDetails.glutenFree) ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th>Vegetarian?</th>
                        <td>{(fullDetails.vegetarian) ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th>Vegan?</th>
                        <td>{(fullDetails.vegan) ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <th>Recipe Source</th>
                        <td>{fullDetails.sourceName}</td>
                    </tr>
                    <tr>
                        <th>Recipe Source URL</th>
                        <td><a href={fullDetails.sourceUrl}>More Info</a></td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <br></br>
        </div> : <></>}
     </>
    );
  };
  
  export default RecipeDetail;