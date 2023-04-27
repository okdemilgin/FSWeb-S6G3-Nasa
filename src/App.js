import React from "react";
import "./App.css";
import { useEffect,useState } from "react";
import Main from "./layout/Main"
import axios from "axios";
import APODViewer from "./components/APODViewer";

function App() {
 const [apod,setApod] = useState();
 const [loaded,setLoaded] = useState (false);
 const [currentDate, setCurrentDate] = useState(
  new Date().toISOString().split("T")[0]
  );

function fetchApod (dateParam) {
axios.get('https://api.nasa.gov/planetary/apod', {
    params: {
    api_key: "g9jhe7ZrCvxV87hEDwYcy5HJrBdiPvMwOK1YXTP5",
    date: dateParam,
    thumbs: true,
  }
})
.then(function (response) {
  console.log(response);
  setApod(response.data);
  setLoaded (true);
})
.catch(function (error) {
  console.log(error);
  setLoaded (false);
})
.finally(function () {
  console.log ("axios apod");
});  
}

useEffect (() => {
  fetchApod (currentDate);
}, [currentDate]);

function dateChangeHandler(e) {
  console.log(e.target.value);
  setCurrentDate(e.target.value);
}

  return (
    <div className="App">
      <Main />
      {!loaded && <p>"🚀 motor ısınıyor", Yalan söyleme gözlerime bak </p>}
      {loaded && (
      <>
      <label htmlFor="apodDate">apodDate:</label>
      <input
        onChange={(e) => dateChangeHandler(e)}
        type="date"
        value={currentDate}
        name="apodDate"
      ></input>
      <APODViewer bundazatenpropsolmuyormu={apod} />
    </>
  )}
</div>
);
}

export default App;
