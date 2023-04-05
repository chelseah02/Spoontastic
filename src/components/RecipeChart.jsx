import React, { Component, useEffect, useState, PureComponent } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import '../index.css';

const RecipeChart = () => {
    const [lineData, setLineData] = useState([]);
    useEffect(() => {
        const getRecipeTrend = async () => {
            const response = await fetch(
              `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=pasta&maxFat=25&number=16&addRecipeInformation=true`
            );
            const json = await response.json();
            if (json['results'][0].id == null) {
              alert("Oops! Something went wrong with that query! Let's try again...");
              console.log("Error!");
            }
            else {
              console.log(json['results']);
              /*{json['results'].length ? 
                (Object.keys(json['results']).map((recipe =>
                  setLineData(previous => ({
                    listData: [{...previous}, {x: json['results'][recipe].weightWatcherSmartPoints, y: json['results'][recipe].healthScore}]
                  }))
                ))) : console.log("No list yet!"); */
              setLineData([
                {x: json['results'][0].weightWatcherSmartPoints, y: json['results'][0].healthScore},
                {x: json['results'][1].weightWatcherSmartPoints, y: json['results'][1].healthScore},
                {x: json['results'][2].weightWatcherSmartPoints, y: json['results'][2].healthScore},
                {x: json['results'][3].weightWatcherSmartPoints, y: json['results'][3].healthScore},
                {x: json['results'][4].weightWatcherSmartPoints, y: json['results'][4].healthScore},
                {x: json['results'][5].weightWatcherSmartPoints, y: json['results'][5].healthScore},
                {x: json['results'][6].weightWatcherSmartPoints, y: json['results'][6].healthScore},
                {x: json['results'][7].weightWatcherSmartPoints, y: json['results'][7].healthScore},
                {x: json['results'][8].weightWatcherSmartPoints, y: json['results'][8].healthScore},
                {x: json['results'][9].weightWatcherSmartPoints, y: json['results'][9].healthScore},
                {x: json['results'][10].weightWatcherSmartPoints, y: json['results'][10].healthScore},
                {x: json['results'][11].weightWatcherSmartPoints, y: json['results'][11].healthScore},
                {x: json['results'][12].weightWatcherSmartPoints, y: json['results'][12].healthScore},
                {x: json['results'][13].weightWatcherSmartPoints, y: json['results'][13].healthScore},
                {x: json['results'][14].weightWatcherSmartPoints, y: json['results'][14].healthScore},
                {x: json['results'][15].weightWatcherSmartPoints, y: json['results'][15].healthScore}]

              )
            }
        };
        getRecipeTrend().catch(console.error);
      }, []);
      console.log(lineData);
      return (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <h3> Graphing the Recipes' Health Factors</h3>
          <p style={{backgroundColor: "beige", color: "maroon"}}> The chart below displays the relationship between a pasta recipe's health score and weight watcher smart points. 
          This is to show the unique trends between how the health rating of a meal and its contribution to weight loss.
          There is a slight trend upward, where the healthier meals are contributing to weight loss. However, there are several
          recipes that are outliers, so this tells an interesting outcome that meals that cause more weight loss are not necessarily
          healthy for an individual.
          </p>
          {(lineData.length) ? (// rendering only if API call actually returned us data
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
              className="chart"
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Weight Watcher Smart Points">
                <Label  value={"Weight Watcher Smart Points"} />
              </XAxis>
              <YAxis type="number" dataKey="y" name="Health Score">
                <Label value={"Health Score"} />
              </YAxis>
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Pasta Recipes" data={lineData} fill="#8884d8" shape="circle" />
            </ScatterChart>
          </ResponsiveContainer>
          ) : null}
        </div>
      );
    
  };

export default RecipeChart;

