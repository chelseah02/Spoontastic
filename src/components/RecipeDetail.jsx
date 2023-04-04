import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const RecipeDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState([]);
    useEffect(() => {
        const getRecipeDetail = async () => {
          const details = await fetch(
            `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=654959,654857,654883,654926,654944,654905,654901,654913,654835,654935,654797,654887,654939,654897,716429,663126`
          );
        const detailsJson = await details.json();
        if (detailsJson.Data["results"][0].id != null)
            setFullDetails(detailsJson["results"]);
        else {
            alert("No output yet!");
            console.log("Error!");
        }
        };
        getRecipeDetail().catch(console.error);
        }, []);
    console.log(detailsJson);
    return (

     <>
      {fullDetails.length ? <>
        <h1> More Information About the Recipe</h1>
        <h1>{fullDetails[params.id].title}</h1>
        <img
          className="images"
          src={fullDetails[params.id].image}
          alt={`Small icon for ${params.id} recipe`}
        />
        <div> {fullDetails[params.id].summary}</div>
        <br></br>
        <div>
          This dish provides{" "}
          {fullDetails[params.id].servings}{" servings."}
        </div> </> : <></>}
        <table>
        {fullDetails.length ? 
            <tbody>
                <tr>
                    <th>Ready Time</th>
                    <td>{fullDetails[params.id].readyInMinutes}</td>
                </tr>
                <tr>
                    <th>Health Score</th>
                    <td>{fullDetails[params.id].healthScore}</td>
                </tr>
                <tr>
                    <th>Dairy Free?</th>
                    <td>{fullDetails[params.id].dairyFree}</td>
                </tr>
                <tr>
                    <th>Gluten Free?</th>
                    <td>{fullDetails[params.id].glutenFree}</td>
                </tr>
                <tr>
                    <th>Vegetarian?</th>
                    <td>{fullDetails[params.id].vegetarian}</td>
                </tr>
                <tr>
                    <th>Vegan</th>
                    <td>{fullDetails[params.id].vegan}</td>
                </tr>
                <tr>
                    <th>Wine Pairing Suggestion</th>
                    <td>{fullDetails[params.id].winePairing.pairedWines[0]}</td>
                </tr>
                <tr>
                    <th>Recipe Source</th>
                    <td>{fullDetails[params.id].sourceName}</td>
                </tr>
                <tr>
                    <th>Recipe Source URL</th>
                    <td>{fullDetails[params.id].sourceUrl}</td>
                </tr>
            </tbody>
            : <br></br> }
        </table>
    
     </>
    );
  };
  
  export default RecipeDetail;