import React, { useEffect, useState } from "react";
import Card from "./Card";
import { nanoid } from "nanoid";

export default function Board(props) {
    const [board, setBoard] = useState([])
    

    useEffect(() => {
        let array = [...props.pics]
        let doubled = array.concat(array)
        let random = randomizeBoard(doubled)
        const newBoard = []
        for (let i = 0; i < random.length; i++) {
            newBoard.push({
                url: random[i],
                id: nanoid(),
                clicked: false,
                matched: false
            })
        }

        setBoard(newBoard)
    }, [props.pics])

  
    
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
        <div className="board">{gameBoard}</div>
    )
}