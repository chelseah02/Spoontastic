import { useState, useEffect, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import List from './components/List'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {

  const [recipe, setRecipe] = useState({
    id:"",
    title:"",
    readyTime: "",
    servings: "",
    healthScore: "",
    sourceUrl: "",

  })
  const [list, setList] = useState([]);
  console.log("List before rendering");
  console.log(list);
  useEffect(() => {
    const fetchAllRecipeData = async () => {
      const response = await fetch(
        // how do we call an API using fetch? 
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ACCESS_KEY}&query=pasta&maxFat=25&number=16&addRecipeInformation=true`
      );
      const json = await response.json();
      console.log("Setting json!");
      console.log(json);

        // At least one recipe; otherwise, try query again
      if (json['results'][0].id == null){
        alert("Oops! Something went wrong with that query, let's try again!")
        console.log("Error!");
      }
      else {
        setList(json['results']);
        console.log("List")
        console.log(list); // returns error, cannot set json data to list
      }
    };
    fetchAllRecipeData().catch(console.error);
  }, []);

  console.log(list);
  // Initializing values for cards

  const HealthCard = (props) => {
    const [avgHealth, setAvgHealth] = useState(0);
    const handleHealth = () => {
      console.log("handle health!");
      if (list.length) {
        console.log("list length inside health!");
        console.log(list.length);
        console.log(list[0].healthScore);
        let sum = 0;
        let currentAvg = 0;
        for (let i = 0; i < list.length; i++) {
          sum = sum + list[i].healthScore;
        }
        currentAvg = sum / list.length;
        console.log("current average");
        console.log(currentAvg);
        if (currentAvg != avgHealth) {
          console.log("Not equal to avgHealth!");
          setAvgHealth(currentAvg);
          console.log("New average health!");
          console.log(avgHealth);
        }
      }
    }
    return(
        <div className="card" onClick={handleHealth}>
            <h2>{props.title}</h2>
            {avgHealth ? <h2> {avgHealth} </h2> : <h2> {"Click to see!"} </h2>}
        </div>
    )
}
  const RecipeCountCard = () => {
    return(
      <div className="card">
          <h2>Total Recipes Displayed</h2>
          {list.length ? <h2>{list.length}</h2>: <h2>0</h2>}
      </div>
  )
  }

  const ShortestTimeCard = () => {
    const [shortestTime, setShortestTime] = useState(0);
    const handleCook = () => {
      console.log("handle cook!");
      if (list.length) {
        console.log("list length inside cook!");
        console.log(list.length);
        console.log(list[0].readyInMinutes);
        let minTime = 100000000;
        let currentTime = 0;
        for (let i = 0; i < list.length; i++) {
          currentTime = list[i].readyInMinutes;
          if (currentTime < minTime) {
            minTime = currentTime;
          }
        }
        console.log("shortest time");
        console.log(minTime);
        if (minTime != shortestTime) {
          console.log("Not equal to shortestTime!");
          setShortestTime(minTime);
        }
      } }
    return (
      <div className="card" onClick={handleCook}>
        <h2>Shortest Time to Make Recipe</h2>
        {shortestTime ? <h2> {shortestTime + " minutes"} </h2> : <h2> {"Click to see!"} </h2>}
      </div>
    )
  }

  return (
    <div className="App">
      <div className='header'>
        <h1>Spoontastic!</h1>
      </div>
      <div className="sum-stats">
        <HealthCard title="Average Health Score"></HealthCard>
        <RecipeCountCard></RecipeCountCard>
        <ShortestTimeCard></ShortestTimeCard>
      </div>
      <div className="recipe_list">
        <h3>Recipes</h3>
        <table>
          <thead>
            <tr>
              <th> Recipe Name </th>
              <th> Time Until Ready</th>
              <th> Servings</th>
              <th> Health Score </th>
            </tr>
          </thead>
          <tbody>
            {list.length && Object.entries(list).map(([recipe]) =>
            <tr key={list[recipe].id}>
              <td>{list[recipe].title}</td>
              <td>{list[recipe].readyInMinutes + " minutes"}</td>
              <td>{list[recipe].servings}</td>
              <td>{list[recipe].healthScore}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
