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
  //const [filteredList, setFilteredList] = useState([]);
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
      }
    };
    fetchAllRecipeData().catch(console.error);
  }, []);
  console.log("Regular list");
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
          <h2>Total Recipes Originally Displayed</h2>
          {list.length ? <h2>{list.length}</h2>: <h2>0</h2>}
      </div>
  )
  }

  const MaxServingsCard = () => {
    const [mostServings, setMostServings] = useState(0);
    const handleServings = () => {
      console.log("handle cook!");
      if (list.length) {
        console.log("list length inside cook!");
        console.log(list.length);
        console.log(list[0].readyInMinutes);
        let maxServings = -100000000;
        let currentServings = 0;
        for (let i = 0; i < list.length; i++) {
          currentServings = list[i].servings;
          if (currentServings > maxServings) {
            maxServings = currentServings;
          }
        }
        console.log("max servings");
        console.log(maxServings);
        if (maxServings != mostServings) {
          console.log("Not equal to mostServings!");
          setMostServings(maxServings);
        }
      } }
    return (
      <div className="card" onClick={handleServings}>
        <h2>Original Maximum Servings for a Recipe</h2>
        {mostServings ? <h2> {mostServings + " servings"} </h2> : <h2> {"Click to see!"} </h2>}
      </div>
    )
  }

  const [searchInput, setSearchInput] = useState("");
  const [servingsRequest, setServingsRequest] = useState("");

  const handleSearchInput = searchValue => {
      // check search to filter based on user's inputs
      setSearchInput(searchValue);
  };
  const handleServingsInput = input => {
    setServingsRequest(input);
  };


  const [fourServings, setFourServings] = useState(false);
  const [fiveServings, setFiveServings] = useState(false);
  const [elevenServings, setElevenServings] = useState(false);
  const [twentyServings, setTwentyServings] = useState(false);
  const handleFourServings = () => {
    setFourServings(!fourServings);
    /*setFilteredList(
      Object.keys(filteredList).filter((item) => 
        Object.values(filteredList[item].servings) <= (4))
    )*/
  };
  const handleFiveServings = () => {
    setFiveServings(!fiveServings);
  };
  const handleElevenServings = () => {
    setElevenServings(!elevenServings);
  };
  const handleTwentyServings = () => {
    setTwentyServings(!twentyServings);
  };

  return (
    <div className="App">
      <div className='header'>
        <h1>Spoontastic!</h1>
      </div>
      <h4> Enter recipe name: </h4>
      <input
        type="text"
        placeholder='Search...'
        onChange={(inputString) => handleSearchInput(inputString.target.value)}
      />
      <h4> Enter number of servings: </h4>
      <input
        type="text"
        placeholder='Search...'
        onChange={(servingsInput) => handleServingsInput(servingsInput.target.value)}
      />
      <div>
        <button className='btn-filter' onClick={handleFourServings}>4 and under</button>
        <button className='btn-filter' onClick={handleFiveServings}> Between 5 and 10</button>
        <button className='btn-filter' onClick={handleElevenServings}>Between 11 and 20</button>
        <button className='btn-filter' onClick={handleTwentyServings}> Over 20</button>
      </div>
      <div className="sum-stats">
        <HealthCard title="Original Average Health Score"></HealthCard>
        <RecipeCountCard></RecipeCountCard>
        <MaxServingsCard></MaxServingsCard>
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
            {
              (searchInput.length > 0)
                ? ( 
                    Object.keys(list).filter((item) => 
                      Object.values(list[item].title)
                          .join("")
                          .toLowerCase()
                          .includes(searchInput.toLowerCase())
                    ).map((recipe) =>
                      <tr key={list[recipe].id}>
                        <td>{list[recipe].title}</td>
                        <td>{list[recipe].readyInMinutes + " minutes"}</td>
                        <td>{list[recipe].servings}</td>
                        <td>{list[recipe].healthScore}</td>
                      </tr>
                    ) 
                  )
                : 
                    ((servingsRequest.length > 0)
                ? ( 
                    Object.keys(list).filter((item) => 
                      (list[item].servings)
                          .toString()
                          .includes(servingsRequest)
                    ).map((recipe) =>
                      <tr key={list[recipe].id}>
                        <td>{list[recipe].title}</td>
                        <td>{list[recipe].readyInMinutes + " minutes"}</td>
                        <td>{list[recipe].servings}</td>
                        <td>{list[recipe].healthScore}</td>
                      </tr>
                    ) 
                  )
                : 
                      list.length && Object.entries(list).map(([recipe]) =>
                        <tr key={list[recipe].id}>
                          <td>{list[recipe].title}</td>
                          <td>{list[recipe].readyInMinutes + " minutes"}</td>
                          <td>{list[recipe].servings}</td>
                          <td>{list[recipe].healthScore}</td>
                        </tr>
                        ))

            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
