import React, { useEffect, useState } from "react";
import './app.css';
import { nanoid } from "nanoid";
import Card from "./components/Card";


function App() {
 
  const [board, setBoard] = useState([])

  function getPics() {
    Promise.all([
      fetch('http://shibe.online/api/cats?count=3&urls=true&httpsUrls=true'),
      fetch('http://shibe.online/api/birds?count=3&urls=true&httpsUrls=true'),
      fetch('http://shibe.online/api/shibes?count=3&urls=true&httpsUrls=true')
    ])
    .then(res => Promise.all(res.map(item => item.json())))
    .then(data => {
      let all = [...data[0], ...data[1], ...data[2]] 
      let doubled = all.concat(all)
      let random = randomizeBoard(doubled)
      let newBoard = random.map(item => ({
        url: item,
        id: nanoid(),
        clicked: false,
        matched: false
      }))
      setBoard(newBoard)
    })  
    .catch(err => console.log(err))
  }
  
  useEffect(() => getPics(), [])
  useEffect(() => {
    const allClicked = board.filter(item => item.clicked)
    if (allClicked.length === 2) {
      checkMatch(allClicked)
    } 
    

  }, [board])
 
  function randomizeBoard(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array
}

function clickHandler(id) {   
  setBoard(prev => prev.map(item => item.id === id ? {...item, clicked: !item.clicked} : item))

}

function checkMatch(array) {
    array[0].url === array[1].url ? console.log("Match!") :
    console.log("Try again")
}


const gameBoard = board.map(card => {
     

  return (
 
  <Card 
      key={card.id}
      id={card.id}
      clicked={card.clicked}
      clickHandler={() => clickHandler(card.id)}
      img={card.url} 
      alt={card.url.substring(card.url.lastIndexOf('/') + 1)}
  />


  )
})

  return (
    <div className="App">                
     <div className="board">{gameBoard}</div>
    </div>
  )
}

export default App;
