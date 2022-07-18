import React, { useEffect, useState } from "react";
import './app.css';
import Board from "./components/Board";


function App() {
 
  const [pics, setPics] = useState([])



  

  useEffect(() => {
    Promise.all([
      fetch('http://shibe.online/api/cats?count=3&urls=true&httpsUrls=true'),
      fetch('http://shibe.online/api/birds?count=3&urls=true&httpsUrls=true'),
      fetch('http://shibe.online/api/shibes?count=3&urls=true&httpsUrls=true')
    ])
    .then(res => Promise.all(res.map(item => item.json())))
    .then(data => {
      let all = [...data[0], ...data[1], ...data[2]] 
      setPics(all)
    })  
    .catch(err => console.log(err))
  }, [])
 

  

  const clickHandler = () =>  {
  
   
  }



  return (
    <div className="App">
          
      <button onClick={clickHandler}>Get pic</button>
      {/* <Card img={pic} /> */}
      <Board pics={pics}/>
    </div>
  );
}

export default App;
